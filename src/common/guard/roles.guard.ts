import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { RoleRepository } from 'src/module/auth/repository/roles.reposiory';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly RoleRepo: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    console.log(user);

    const userPermissions = await this.RoleRepo.getWithAsync({
      relations: ['permission'],
      id: user.role,
    });

     const Permissions = await this.RoleRepo.getWithAsync({
      relations: ['permission'],
      role: requiredRoles[0],
    });
    console.log(Permissions[0].permission);
    console.log(userPermissions[0].permission);
    if (!user || !user.role) {
      return false;
    }
    return requiredRoles.some((role) => user.role.includes(role));
  }
}
