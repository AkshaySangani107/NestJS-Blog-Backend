import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { ResponseRolesDto } from "../dto/response-role.dto";
import { Roles } from "../enitites/roles.entity";

export class RoleProfile extends AutomapperProfile{
    constructor(@InjectMapper() mapper: Mapper){
        super(mapper);
    }

    override get profile(){
        return (mapper : Mapper)=>{
            createMap(mapper,Roles,ResponseRolesDto)
        }
    }
}