import {  ApiPropertyOptional } from "@nestjs/swagger";
import { EOrder } from "../filtering";
import { IsEnum } from "class-validator";

    export class PaginationDto{
        @ApiPropertyOptional({description : 'Expected Page Number'})
        page : number

        @ApiPropertyOptional({description : 'Expected Items Per Number'})
        perPage : number

        @ApiPropertyOptional({description : 'Order of Data' , default : EOrder.Asc  , enum : EOrder})
        @IsEnum(EOrder)
        order : EOrder
    }