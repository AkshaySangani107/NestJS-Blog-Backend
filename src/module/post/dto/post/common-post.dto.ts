import { AutoMap } from '@automapper/classes';
import { CommonUserDto } from 'src/module/user/dto/user/common-user.dto';
import { CommonCommentDto } from '../comment/common-comment.dto';
import { ImageEntity } from '../../entities/postImage.entity';
export class CommonPostDto {
  @AutoMap()
  title: string;

  @AutoMap()
  content: string;

  @AutoMap()
  author: CommonUserDto;

  @AutoMap()
  comments: CommonCommentDto[];

  @AutoMap()
  likedBy: CommonUserDto[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;

  @AutoMap()
  images: ImageEntity[];
}
