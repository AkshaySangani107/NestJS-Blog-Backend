import { faker } from "@faker-js/faker";
import { Post } from "../module/post/entities/post.entity";
import { setSeederFactory } from "typeorm-extension";

export const PostFactory =setSeederFactory(Post,async()=>{
    const post = new Post()
    post.title = faker.lorem.text()
    post.content = faker.lorem.paragraph()
    return post;
})