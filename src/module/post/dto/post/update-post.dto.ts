import { AutoMap } from "@automapper/classes";
import { RequestPostDto } from "./request-post.dto";

export class UpdatePostDto extends RequestPostDto{
    @AutoMap()
    id : number
}