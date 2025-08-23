import { DataSourceOptions, DataSource } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { RoleFactory } from './role.seeder';
import { MainSeeder } from './main.seeder';
import { PostFactory } from './post.factory';
import { CommentFactory } from './comments.factory';
import { ProfileFactory } from './profile.factory';
require('dotenv').config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  factories: [UserFactory,RoleFactory,PostFactory,CommentFactory,ProfileFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});

export default dataSource;
