
import { AutoMap } from '@automapper/classes';

import { ResponseCommentDto } from '../comment/response-comment.dto';
import { ResponseUserDto } from 'src/module/user/dto/user/response-user.dto';
import { ImageResponseDto } from '../image/response-image.dto';
export class ResponsePostDto {
  @AutoMap()
  title: string;

  @AutoMap()
  content: string;

  @AutoMap()
  author: ResponseUserDto;

  @AutoMap()
  comments: ResponseCommentDto[];

  @AutoMap()
  likedBy: ResponseUserDto[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
  id:number

    @AutoMap()
    images: ImageResponseDto[];
}
