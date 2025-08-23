
import { DataSource } from 'typeorm';
import * as dotenv from "dotenv"
dotenv.config();
// require('dotenv').config({ path: '.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT), 
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: [__dirname + '/../module/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
});


