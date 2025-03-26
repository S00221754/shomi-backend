import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
  extra: isProduction ? { ssl: { rejectUnauthorized: false }, family: 4 } : {}, // family 4 is to help work with render ipv4 should be changed to 6 when approved from microsoft
  entities: [isProduction ? "dist/entities/*.js" : "src/entities/*.ts"],
  migrations: [isProduction ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
});

export default AppDataSource;
