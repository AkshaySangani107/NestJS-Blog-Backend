import { Entity } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDto } from '../user/response-user.dto';
@Entity()
export class ResponseUserProfile{
  @AutoMap()
  @ApiProperty()
  userName: string;

  @AutoMap()
  @ApiProperty()
  bio: string;

  @AutoMap()
  @ApiProperty()
  location: string;

  @AutoMap()
  @ApiProperty()
  phone: number;

  @AutoMap()
  @ApiProperty()
  user: ResponseUserDto;

  @AutoMap()
  id :number

  @AutoMap()
  Profile_url: string;
  createdAt:Date
  deletedAt:Date
   updateAt:Date
}
