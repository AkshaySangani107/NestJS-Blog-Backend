import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Index } from 'typeorm';
import { User } from '../module/user/entities/user.entity';
import { Roles } from '../module/auth/enitites/roles.entity';
import { fa, faker } from '@faker-js/faker';
import { Post } from '../module/post/entities/post.entity';
import { Comment } from '../module/post/entities/comment.entity';
import { Profile } from '../module/user/entities/profile.entity';

export class MainSeeder implements Seeder {
  public async run(
    DataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepo = DataSource.getRepository(Roles);
    const RoleFactory = factoryManager.get(Roles);
    const roles = [];
    for (let i = 0; i < 2; i++) {
      const role = await RoleFactory.make();
      roles.push(role);
    }
    const userRoles: Roles[] = await roleRepo.save(roles);

    const Userfactory = factoryManager.get(User);
    const userRepo = DataSource.getRepository(User);
    const Profilefactroy = factoryManager.get(Profile);
    const users: User[] = [];

    for (let i = 0; i < 100; i++) {
      const user = await Userfactory.make();
      const profile = await Profilefactroy.make();
      user.profile = profile;
      user.role = faker.helpers.arrayElement(userRoles);
      users.push(user);
    }
    const savedUsers = await userRepo.create(users);
    const x = await userRepo.save(savedUsers);

    const postRepo = DataSource.getRepository(Post);
    const postFactory = factoryManager.get(Post);
    const posts: Post[] = [];
    for (let i = 0; i < 100; i++) {
      const post = await postFactory.make();
      post.author = faker.helpers.arrayElement(x);
      posts.push(post);
    }
    const savedPost = await postRepo.save(posts);

    const CommentRepo = DataSource.getRepository(Comment);
    const CommentFactory = factoryManager.get(Comment);
    const comments: Comment[] = [];
    for (let i = 0; i < 100; i++) {
      const comment = await CommentFactory.make();
      comment.post = faker.helpers.arrayElement(savedPost);
      comment.user = faker.helpers.arrayElement(x);
      comments.push(comment);
    }
    const savedComment = await CommentRepo.save(comments);

    for (let i = 0; i < 5; i++) {
      
      for (let index = 1; index < 100; index++) {
        const post = faker.helpers.arrayElement(savedPost);
        console.log(post);
        const user = await userRepo.findOne({where : { id: index } ,  relations: ['likedPosts']});
        console.log(user);
        user.likedPosts.push(post);
        const liked =await userRepo.save(user);
      }
    }
  }
}
//