
import { AutoMap } from '@automapper/classes';
import { CommonUserDto } from 'src/module/user/dto/user/common-user.dto';
import { CommonPostDto } from '../post/common-post.dto';
export class CommonCommentDto {

  @AutoMap()
  content: string;

  @AutoMap()
  user: CommonUserDto;

  @AutoMap()
  post: CommonPostDto;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  updateAt: Date;
}
