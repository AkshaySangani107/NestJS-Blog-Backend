import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleRepository } from 'src/module/auth/repository/roles.reposiory';
import { PermissionsEnum } from '../enums/permission.dto';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly RoleRepo: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const Requiredpermissions = this.reflector.get<PermissionsEnum[]>(
      'permissions',
      context.getHandler(),
    );

    if (!Requiredpermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const req = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      return false;
    }
    const userPermissions = await this.RoleRepo.getWithAsync({
      relations: ['permission'],
      id: user.role,
    });

    const permissionArray = [];
    userPermissions[0].permission.forEach((p) => {
      permissionArray.push(p.Permission_type);
    });

    if (
      permissionArray.includes(PermissionsEnum.DeleteAll) &&
      permissionArray.includes(PermissionsEnum.ReadAll) &&
      permissionArray.includes(PermissionsEnum.WriteAll)
    ) {
      req['ALL_GRANTED'] = true;
      return true;
    }

   // console.log(permissionArray);
   // console.log(Requiredpermissions);
    // const x = Requiredpermissions.some((permission : string) =>{
    //   console.log(permission)
    //   permissionArray.includes(permission)
    // } );
    // console.log(x);
    let flag : boolean= true;
     Requiredpermissions.forEach((permission) => {
      if(!permissionArray.includes(permission)){
          flag = false;
          return flag;
      }
    });
   // console.log("***********************************object",flag);
    return flag;
  }
}
