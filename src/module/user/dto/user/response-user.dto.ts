import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';

import { ResponseUserProfile } from '../userProfile/response-profile.dto';
import { ResponsePostDto } from 'src/module/post/dto/post/response-post';
import { ResponseCommentDto } from 'src/module/post/dto/comment/response-comment.dto';
import { Exclude } from 'class-transformer';
import { Roles } from '../../../auth/enitites/roles.entity';

export class ResponseUserDto {
  @ApiProperty()
  @AutoMap()
  email: string;
  @ApiProperty()
  @AutoMap()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;


  @AutoMap()
  @Exclude()
  password: string;

  
  @AutoMap()
  profile: ResponseUserProfile;

  @AutoMap()
  posts: ResponsePostDto[];

  @AutoMap()
  comments: ResponseCommentDto[];

  @AutoMap()
  likedPosts: ResponsePostDto[];

  @AutoMap()
  id: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
  // @Exclude()
  role : Roles
}
