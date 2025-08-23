import { AutoMap } from '@automapper/classes';

import { User } from '../../entities/user.entity';

export class CommonUserProfile {
  @AutoMap()
  userName: string;

  @AutoMap()
  bio: string;

  @AutoMap()
  location: string;

  @AutoMap()
  phone: number;

  @AutoMap()
  user: User;

  @AutoMap()
  id: number;

  @AutoMap()
  Profile_url: string;
}
