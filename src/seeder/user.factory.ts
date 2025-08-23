import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
import { User } from '../module/user/entities/user.entity';

export const UserFactory = setSeederFactory(User, async () => {

    const password = '123456';
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName(),
    user.email = faker.internet.email(),
    user.password = hashPassword

    return user;
});
