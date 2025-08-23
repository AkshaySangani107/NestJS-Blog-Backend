import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { fieldEnum } from "../enums/feild.enum";

export class feildDto{
    @ApiProperty({enum : fieldEnum, description : 'Select Feild for seacrh'})
    @IsEnum(fieldEnum)
    feild : fieldEnum
}