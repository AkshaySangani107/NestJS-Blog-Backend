import { Injectable } from "@nestjs/common";
import { NotFoundErr } from "src/common/exceptions/notFoundException.exception";
import { UserRepository } from "src/module/user/repository/user.repository";
import { CommentRepositry } from "../repository/comment.repository";
import { PostRepositry } from "../repository/post.repository";
import { paramDto } from "src/common/dto/params.dto";
import { Request } from "express";


@Injectable()
export class LikeService{
   constructor(
    readonly commentRepo: CommentRepositry,
    readonly userRepo: UserRepository,
    readonly postRepo: PostRepositry,
  ) {}

 async likePost(payload : {email : string}, paramDto: paramDto) : Promise<string> {
    const email = payload.email;
    const user = await this.userRepo.getWithAsync({
      email: email,
      relations: ['likedPosts'],
    });

    const post = await this.postRepo.getAsync(paramDto.id);

    if (!post) {
      throw new NotFoundErr(`No Post Found`);
    }

    const alreadyLiked = user[0].likedPosts.find((p) => p.id == paramDto.id);
    if (alreadyLiked) {
      user[0].likedPosts = user[0].likedPosts.filter(
        (p) => p.id != paramDto.id,
      );
      const liked = await this.userRepo.createAsync(user[0]);
      return 'Unliked';
    }
    user[0].likedPosts.push(post);
    const liked = await this.userRepo.createAsync(user[0]);
    console.log(liked);
    return `Liked`;
  }
  
}