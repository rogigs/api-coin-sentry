import { DataSource } from "typeorm";
import { CreateHistoric1693086244784 } from "./migrations/1693086244784-CreateHistoric";
import { Historic } from "../entities/Historic";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "rogigs",
  password: "YkWoyHPxJK26",
  database: "neondb",
  host: "ep-super-queen-95391970.us-east-2.aws.neon.tech",
  synchronize: true,
  logging: true,
  entities: [Historic],
  subscribers: [],
  migrations: [CreateHistoric1693086244784],
  ssl: true,
});
