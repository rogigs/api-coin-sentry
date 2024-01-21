import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Finances } from "../entities/finances.entities";
import { User } from "../entities/user.entities";

dotenv.config();

// TODO: make migration work
const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  synchronize: true,
  logging: true,
  migrations: [],
  entities: [User, Finances],
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
