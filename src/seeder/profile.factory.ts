import {  faker } from "@faker-js/faker";
import { Profile } from "../module/user/entities/profile.entity";
import { setSeederFactory } from "typeorm-extension";

export const ProfileFactory = setSeederFactory(Profile,async()=>{
    const profile = new Profile();
    profile.userName = faker.internet.username(),
    profile.location = faker.location.country(),
    profile.bio = faker.person.bio();
    profile.phone = 901640
    return profile;

})
