
import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { ResponsePostDto } from '../post/response-post';
import { ResponseUserDto } from 'src/module/user/dto/user/response-user.dto';
export class ResponseCommentDto {

  @ApiProperty()
  @AutoMap()
  content: string;

  @AutoMap()
  user: ResponseUserDto;

  @AutoMap()
  post: ResponsePostDto;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  id:number
}
