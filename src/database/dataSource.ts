import { DataSource } from "typeorm";
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
  migrations: [__dirname + "/../../database/migrations/*.{ts,js}"],
  entities: [__dirname + "/../**/entities/*.{ts,js}"],
  subscribers: [],
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
