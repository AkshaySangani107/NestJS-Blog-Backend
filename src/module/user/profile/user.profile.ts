import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CommonUserDto } from '../dto/user/common-user.dto';
import { RequestUserDto } from '../dto/user/request-user.dto';   
import { ResponseUserDto } from '../dto/user/response-user.dto';
import { Profile } from '../entities/profile.entity';
import { ResponseUserProfile } from '../dto/userProfile/response-profile.dto';
import { CommonUserProfile } from '../dto/userProfile/common-profile.dto';
@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RequestUserDto, CommonUserDto);
      createMap(mapper, CommonUserDto, User);
      createMap(mapper, User, ResponseUserDto,forMember((d)=>d.comments,mapFrom((s)=>s.comments)) , forMember((d)=>d.posts,mapFrom((s)=>s.posts)) , forMember((d)=>d.likedPosts,mapFrom((s)=>s.likedPosts)));
      createMap(mapper, User, CommonUserDto);
      createMap(mapper, CommonUserDto, ResponseUserDto);
      createMap(mapper,Profile,ResponseUserProfile)
      createMap(mapper,Profile,CommonUserProfile)
    };
  }
}
