import { DataSource } from "typeorm";
import { CreateHistoric1693086244784 } from "./migrations/1693086244784-CreateHistoric";
import { Historic } from "../entities/Historic";
import dotenv from "dotenv";

dotenv.config();

const connection = new DataSource({
  type: "postgres",
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  synchronize: true,
  logging: true,
  entities: [Historic],
  subscribers: [],
  migrations: [CreateHistoric1693086244784],
  ssl: true,
});

connection
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connection;
