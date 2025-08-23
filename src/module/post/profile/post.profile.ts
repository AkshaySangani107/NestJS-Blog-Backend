import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { ResponsePostDto } from "../dto/post/response-post";
import { Post } from "../entities/post.entity";
import { ResponseCommentDto } from "../dto/comment/response-comment.dto";
import { Comment } from "../entities/comment.entity";

import { Injectable } from "@nestjs/common";
import { CommonPostDto } from "../dto/post/common-post.dto";
import { ImageEntity } from "../entities/postImage.entity";
import { ImageResponseDto } from "../dto/image/response-image.dto";
@Injectable()
export class PostProfile extends AutomapperProfile{
    constructor(@InjectMapper() mapper : Mapper){
        super(mapper);
    }

    override get profile(){
        return (mapper : Mapper)=>{
            createMap(mapper,Post,ResponsePostDto,forMember((s)=>s.likedBy,mapFrom(d=>d.likedBy)), forMember((s)=>s.comments,mapFrom(d=>d.comments)),forMember((d)=>d.author,mapFrom((s)=>s.author)))
            createMap(mapper,Comment,ResponseCommentDto)
            createMap(mapper,Post,CommonPostDto)
            createMap(mapper,ImageEntity,ImageResponseDto)
        }
    
    }
}