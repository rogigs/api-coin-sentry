import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Historic } from "../entities/historic.entities";
import { CreateHistoric1693086244784 } from "./migrations/1693086244784-CreateHistoric";
import { User } from "../entities/user.entities";

dotenv.config();

// TODO: make migration worko
const AppDataSource = new DataSource({
  type: "postgres",
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  synchronize: true,
  logging: true,
  migrations: [CreateHistoric1693086244784],
  entities: [Historic, User],
  subscribers: [],
  ssl: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default AppDataSource;
