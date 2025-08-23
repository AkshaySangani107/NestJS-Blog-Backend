
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { AutoMap } from '@automapper/classes';
import { RequestUserDto } from 'src/module/user/dto/user/request-user.dto';
import { RequestPostDto } from '../post/request-post.dto';
export class RequestCommentDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  content: string;

  @AutoMap()
  user: RequestUserDto;

  @AutoMap()
  post: RequestPostDto;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  id:number
}
