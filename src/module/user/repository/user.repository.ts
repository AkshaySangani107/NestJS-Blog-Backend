import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo, DbException, EFilterOperation } from 'src/common';
import { User } from '../entities/user.entity';
import { ResponseUserDto } from '../dto/user/response-user.dto';

export interface WithRelation {
  relations: string[];
  id?: number;
  email?: string;
}

@Injectable()
export class UserRepository extends BaseRepo<
  User,
  ResponseUserDto,
  User['id']
> {
  constructor(
    @InjectRepository(User) protected readonly userRepo: Repository<User>,
    @InjectMapper() protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
  ) {
    super(userRepo, mapper, logger, User, ResponseUserDto);
  }

  public async getWithAsync(filterObj?: WithRelation): Promise<User[]> {
    try {
      const es = await this.internalRepo.find({
        relations: filterObj.relations,
        where: [
         { id: filterObj.id},
         { email: filterObj.email},
        ],
        order : {
          posts : {
            updateAt : "DESC"
          }
        }
      });
      return es;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }

  public async FilterGenerate(
    key: string,
    value: unknown,
    operation?: EFilterOperation,
  ) {
    try {
      const filter = await this.createPartialWhere(key, value, operation);
      return filter;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
  
  override get softDeleteEnabled(): boolean {
    return true;
  }
}
