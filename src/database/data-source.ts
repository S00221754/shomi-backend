import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER!;
const DB_PASS = process.env.DB_PASS!;
const DB_NAME = process.env.DB_NAME!;
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = Number(process.env.DB_PORT ?? "5432");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    family: 4,
  },
  synchronize: false,
  logging: true,
  entities: [process.env.NODE_ENV === "production" ? "dist/entities/*.js" : "src/entities/*.ts"],
  migrations: [process.env.NODE_ENV === "production" ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
});
export default AppDataSource;
