import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../post/entities/comment.entity';
import { AutoMap } from '@automapper/classes';
import { Roles } from '../../auth/enitites/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column('varchar')
  @AutoMap()
  firstName: string;

  @Column('varchar')
  @AutoMap()
  lastName: string;

  @Column({ unique: true })
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @ManyToOne(()=>Roles,(roles)=>roles.user)
  @AutoMap()
  role: Roles;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  @AutoMap()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.author  , {
    cascade : true
  })
  @AutoMap()
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user , {cascade : true})
  @AutoMap()
  comments: Comment[];

  @ManyToMany(() => Post, (post) => post.likedBy)
  @AutoMap()
  @JoinTable()
  likedPosts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
