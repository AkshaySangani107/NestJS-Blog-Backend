import { faker } from "@faker-js/faker";
import { Comment } from "../module/post/entities/comment.entity";
import { setSeederFactory } from "typeorm-extension";

export const CommentFactory = setSeederFactory(Comment,()=>{
    const comment = new Comment()
    comment.content = faker.lorem.sentence()
    return comment
})