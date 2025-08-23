import { Injectable } from "@nestjs/common";
import { BaseRepo, DbException } from "src/common";
import { Roles } from "../enitites/roles.entity";
import { ResponseRolesDto } from "../dto/response-role.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
export interface WithRelation {
  relations: string[];
  id?: number;
  role? : string
}
@Injectable()
export class RoleRepository extends BaseRepo<Roles,ResponseRolesDto,Roles['id']>{
    constructor(
        @InjectMapper() mapper: Mapper,@InjectRepository(Roles) roleRepo : Repository<Roles>,@InjectPinoLogger() looger : PinoLogger
    ){
        super(roleRepo,mapper,looger,Roles,ResponseRolesDto)
    }

    public async getWithAsync(filterObj?: WithRelation): Promise<Roles[]> {
        try {
          const es = await this.internalRepo.find({
            relations: filterObj.relations,
            where: [
             { id: filterObj.id},
             {role : filterObj.role}
            ],
          });
          return es;
        } catch (ex) {
          this.logger.error(ex);
          throw new DbException(ex);
        }
      }
}