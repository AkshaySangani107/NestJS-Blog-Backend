import { Injectable } from '@nestjs/common';
import { BaseRepo, DbException, EFilterOperation } from 'src/common';
import { Post } from '../entities/post.entity';
import { ResponsePostDto } from '../dto/post/response-post';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, ILike, IsNull, Not } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export interface WithRelation {
  relations: string[];
  id?: number;
  content?: string;
}

@Injectable()
export class PostRepositry extends BaseRepo<Post, ResponsePostDto, Post['id']> {
  constructor(
    @InjectRepository(Post) postRepo: Repository<Post>,
    @InjectMapper() mapper: Mapper,
    @InjectPinoLogger() logger: PinoLogger,
  ) {
    super(postRepo, mapper, logger, Post, ResponsePostDto);
  }

  override get softDeleteEnabled(): boolean {
    return true;
  }

  public async getWithAsync(filterObj?: WithRelation): Promise<Post[]> {
    try {
      const es = await this.internalRepo.find({
        relations: filterObj.relations,
        where: [
          { id: filterObj.id },
          { content: filterObj.content },
          { title: filterObj.content },
          { author: { firstName: filterObj.content } },
          { author: { lastName: filterObj.content } },
          { author: { email: filterObj.content } },
        ],
        order: {
          createdAt: 'DESC',
          comments: {
            createdAt: 'DESC',
          },
        },
      });
      return es;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
  public async searching(filterObj?: WithRelation): Promise<Post[]> {
    try {
      const es = await this.internalRepo.find({
        relations: filterObj.relations,
        where: [
          //  { id: filterObj.id  , author : Not(IsNull)},
          { content: ILike(`%${filterObj.content}%`) },
          { title: ILike(`%${filterObj.content}%`) },
          { author: { firstName: ILike(`%${filterObj.content}%`) } },
          { author: { lastName: ILike(`%${filterObj.content}%`) } },
          { author: { email: ILike(`%${filterObj.content}%`) } },
        ],
        order: {
          createdAt: 'DESC',
        },
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
}
