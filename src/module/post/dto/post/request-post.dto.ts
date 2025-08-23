import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

import { RequestCommentDto } from '../comment/request-comment.dto';
import { RequestUserDto } from 'src/module/user/dto/user/request-user.dto';
import { ImageEntity } from '../../entities/postImage.entity';
export class RequestPostDto {
  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  content: string;

  @AutoMap()
  author: RequestUserDto;

  @AutoMap()
  comments: RequestCommentDto[];

  @AutoMap()
  likedBy: RequestUserDto[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
  id: number;
  @AutoMap()
  images: ImageEntity[];
}
