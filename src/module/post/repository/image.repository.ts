import { BaseRepo } from 'src/common';
import { ImageEntity } from '../entities/postImage.entity';
import { ImageResponseDto } from '../dto/image/response-image.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ImageRepo extends BaseRepo<
  ImageEntity,
  ImageResponseDto,
  ImageEntity['id']
> {
  constructor(
    @InjectRepository(ImageEntity) imgRepo: Repository<ImageEntity>,

    @InjectMapper() readonly mapper: Mapper,
    readonly logger: PinoLogger,
  ) {
    super(imgRepo, mapper, logger, ImageEntity, ImageResponseDto);
  }
}
