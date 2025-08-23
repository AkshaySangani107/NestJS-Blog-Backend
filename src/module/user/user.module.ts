import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './profile/user.profile';
import { ProfileRepository } from './repository/profile.repository';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MailModuleModule } from '../mail/mail-module.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [AuthModule,TypeOrmModule.forFeature([User,Profile]) , CloudinaryModule , MailModuleModule,
  JwtModule.register({
    secret : process.env.JWT_SECRET,
     signOptions: { expiresIn: '24h' },
  })
],
  controllers: [UserController],
  providers: [UserService, UserRepository , UserProfile , ProfileRepository, ProfileService],
  exports: [UserRepository ,ProfileRepository, UserProfile,ProfileService],
})
export class UserModule {}
