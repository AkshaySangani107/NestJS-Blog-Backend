import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { NotFoundErr } from 'src/common/exceptions/notFoundException.exception';
import { ResponseUserProfile } from '../dto/userProfile/response-profile.dto';
import { UserRepository } from '../repository/user.repository';
import { updateUserProfileDto } from '../dto/userProfile/update-profile.dto';
import { ProfileRepository } from '../repository/profile.repository';
import { Request } from 'express';
import { CloudinaryService } from 'src/module/cloudinary/cloudinary.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly UserRepo: UserRepository,
    private readonly ProfileRepository: ProfileRepository,
    @InjectMapper() readonly mapper: Mapper,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async updateUserProfile(
    payload: { email: string },
    updateUserProfileDto: updateUserProfileDto,
    url: string | null,
  ): Promise<ResponseUserProfile> {
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      url,
    );
    const email = payload.email;
    const user = await this.UserRepo.allAsync({ email: email });
    const profile = await this.ProfileRepository.allAsync({ user: user[0] });

    if (profile.length > 0) {
      console.log(profile);
      if (user.length > 0) {
        updateUserProfileDto.id = profile[0].id;
        if (url === null) {
          updateUserProfileDto.Profile_url = profile[0].Profile_url;
        } else {
          updateUserProfileDto.Profile_url = url;
        }
        updateUserProfileDto.user = user[0];
        console.log('object');
        const userProfile =
          await this.ProfileRepository.updateAsync(updateUserProfileDto);
        return userProfile;
      }
    } else {
      if (user.length > 0) {
        updateUserProfileDto.user = user[0];

        updateUserProfileDto.Profile_url = url;

        const userProfile =
          await this.ProfileRepository.updateAsync(updateUserProfileDto);
        return userProfile;
      }
    }
    throw new NotFoundErr('No Profile for update');
  }
}
