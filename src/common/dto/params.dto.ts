import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class paramDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

}
