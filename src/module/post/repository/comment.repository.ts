import { Injectable } from "@nestjs/common";
import { BaseRepo, DbException } from "src/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectPinoLogger, Logger, PinoLogger } from "nestjs-pino";
import { Comment } from "../entities/comment.entity";
import { ResponseCommentDto } from "../dto/comment/response-comment.dto";
export interface WithRelation{
    relations : string[],
    id? : number,
    email? : string
  }
@Injectable()
export class CommentRepositry extends BaseRepo<Comment,ResponseCommentDto,Comment['id']>{
    constructor(
        @InjectRepository(Comment) CommentRepo : Repository<Comment>,
        @InjectMapper() mapper : Mapper,
        @InjectPinoLogger() logger : PinoLogger
    ){
        super(CommentRepo,mapper,logger,Comment,ResponseCommentDto)
    }

     public async getWithAsync(filterObj?:WithRelation): Promise<Comment[]> {
        try {
          const es = await this.internalRepo.find({
            relations : filterObj.relations,
            where : {
              id : filterObj.id,
            }
          });
          console.log(">>>>>>>>>>>",es);
          return es;
        } catch (ex) {
          this.logger.error(ex);
          throw new DbException(ex);
        }
      }

}