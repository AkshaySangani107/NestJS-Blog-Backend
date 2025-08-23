import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class EmailDto{
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email : string

    @IsOptional()
    @ApiProperty()
    @IsString()
    password? : string

    @IsOptional()
    @ApiProperty()
    @IsString()
    token? : string
}