import { AutoMap } from '@automapper/classes';
import { User } from '../../user/entities/user.entity';
import { Permission } from '../enitites/permission.entity';

export class ResponseRolesDto {
  @AutoMap()
  id: number;

  @AutoMap()
  role: string;

  @AutoMap()
  user: User;

  @AutoMap()
  permission: Permission[];

  createdAt: Date;
}
