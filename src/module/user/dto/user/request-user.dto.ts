import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ReuestUserProfie } from '../userProfile/reuest-profile.dto';
import { RequestPostDto } from 'src/module/post/dto/post/request-post.dto';
import { RequestCommentDto } from 'src/module/post/dto/comment/request-comment.dto';
import { Roles } from '../../../auth/enitites/roles.entity';
import { Exclude } from 'class-transformer';

export class RequestUserDto {
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  password: string;

  @AutoMap()
  profile: ReuestUserProfie;

  @AutoMap()
  posts: RequestPostDto[];

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
  role: Roles;
}
