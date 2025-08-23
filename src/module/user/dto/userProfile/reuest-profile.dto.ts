import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../entities/user.entity';

export class ReuestUserProfie {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @AutoMap()
  user: User;

  @AutoMap()
  id: number;

  @AutoMap()
  Profile_url: string;

  createdAt: Date;
  deletedAt: Date;
  updateAt: Date;
}
