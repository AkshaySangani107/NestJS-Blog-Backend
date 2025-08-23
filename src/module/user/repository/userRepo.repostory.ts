import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/interceptors/base-reposiory';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserRepo extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }
   async getAllUser(){
    return this.getRepository(User).find();
   }
}
