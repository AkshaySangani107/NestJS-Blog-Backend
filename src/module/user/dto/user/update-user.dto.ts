import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { RequestCommentDto } from 'src/module/post/dto/comment/request-comment.dto';
import { RequestPostDto } from 'src/module/post/dto/post/request-post.dto';
import { updateUserProfileDto } from '../userProfile/update-profile.dto';
import { UpdatePostDto } from 'src/module/post/dto/post/update-post.dto';
import { Roles } from '../../../auth/enitites/roles.entity';
import { Exclude } from 'class-transformer';

export class UpdateUserDto  {

  @AutoMap()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  lastName: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  @AutoMap()
  password: string;

  @AutoMap()
  profile: updateUserProfileDto;

  @AutoMap()
  posts: UpdatePostDto[];

  @AutoMap()
  comments: RequestCommentDto[];

  @AutoMap()
  likedPosts: RequestPostDto[];

  @AutoMap()
  id: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
    @Exclude()
    role : Roles
}

