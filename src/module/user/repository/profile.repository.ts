import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from 'src/common';
import { Profile } from '../entities/profile.entity';
import { ResponseUserProfile } from '../dto/userProfile/response-profile.dto';
@Injectable()
export class ProfileRepository extends BaseRepo<Profile, ResponseUserProfile,Profile['id']> {
  constructor(
    @InjectRepository(Profile)  protected readonly ProfileRepo: Repository<Profile>,
    @InjectMapper()  protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
  ) {
    super(ProfileRepo, mapper, logger, Profile, ResponseUserProfile);
  }
}
