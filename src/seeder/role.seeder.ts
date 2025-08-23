import { setSeederFactory } from 'typeorm-extension';
import { Roles } from '../module/auth/enitites/roles.entity';
import { faker } from '@faker-js/faker';


export const RoleFactory = setSeederFactory(Roles, async () => {        

  const roles = new Roles();
  roles.role = faker.helpers.arrayElement(['User', "Admin"])

  return roles;
});
