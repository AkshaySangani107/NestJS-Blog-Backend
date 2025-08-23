import { AutoMap } from '@automapper/classes';
import { ResponsePostDto } from '../post/response-post';

export class ImageResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  public_id: string;

  @AutoMap()
  url: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  @AutoMap()
  deletedAt: Date;

  @AutoMap()
  post_id: ResponsePostDto;
}
