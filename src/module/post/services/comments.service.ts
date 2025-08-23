import { Injectable } from '@nestjs/common';
import { RpcInternalServerErrorException } from 'src/common/exceptions';
import { NotFoundErr } from 'src/common/exceptions/notFoundException.exception';
import { UserRepository } from 'src/module/user/repository/user.repository';
import { RequestCommentDto } from '../dto/comment/request-comment.dto';
import { ResponseCommentDto } from '../dto/comment/response-comment.dto';
import { CommentRepositry } from '../repository/comment.repository';
import { PostRepositry } from '../repository/post.repository';
import { paramDto } from 'src/common/dto/params.dto';
import { Request } from 'express';

@Injectable()
export class CommentService {
  constructor(
    readonly commentRepo: CommentRepositry,
    readonly userRepo: UserRepository,
    readonly postRepo: PostRepositry,
  ) {}

  async create(
    payload : {email : string},
    createComment: RequestCommentDto,
    paramDto: paramDto,
  ) : Promise<ResponseCommentDto> {
    const email = payload.email;
    const user = await this.userRepo.allAsync({ email: email });
    const post = await this.postRepo.getAsync(paramDto.id);
    if(post){
      if (user.length > 0) {
        createComment.user = user[0];
        createComment.post = post;
        createComment.id = null
        console.log("*****************************************",createComment);
        const comment = await this.commentRepo.createAsync(createComment);
        return comment;
      }
    }else{
      throw new NotFoundErr(`No Post Found !!!`)
    }
    throw new RpcInternalServerErrorException(`Error in creating commment!!!`)
  }

 
}
