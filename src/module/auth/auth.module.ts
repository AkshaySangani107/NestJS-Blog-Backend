import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from './repository/roles.reposiory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './enitites/roles.entity';
import { Permission } from './enitites/permission.entity';
import { RoleProfile } from './profile/role.profile';
import * as dotenv from "dotenv"
dotenv.config()

@Module({
  imports: [
    forwardRef(()=>UserModule),
    
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),

    TypeOrmModule.forFeature([Roles, Permission]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RoleRepository, RoleProfile],
  exports: [RoleRepository],
})

export class AuthModule {}
