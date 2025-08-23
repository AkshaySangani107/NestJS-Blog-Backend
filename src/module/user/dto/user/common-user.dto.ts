import { AutoMap } from '@automapper/classes';
import { Role } from 'src/common/enums/role.enum';
import { CommonCommentDto } from 'src/module/post/dto/comment/common-comment.dto';
import { CommonPostDto } from 'src/module/post/dto/post/common-post.dto';
import { CommonUserProfile } from '../userProfile/common-profile.dto';

export class CommonUserDto {
  @AutoMap()
  email: string;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
 

  @AutoMap()
  id: number;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  deletedAt: Date;
  
  @AutoMap()
  updateAt: Date;

  @AutoMap()
  comments : CommonCommentDto[]

  @AutoMap()
  posts : CommonPostDto[]

    @AutoMap()
    profile: CommonUserProfile;


}
