import "reflect-metadata";
import { DataSource } from "typeorm";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT ?? "5432");


// used to see if the database exists and if not create it
const createDatabaseIfNotExists = async () => {
  try {
    // uses client to connect to the default database for one time use
    const client = new Client({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: "postgres",
    });

    await client.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`);

    if (result.rowCount === 0) {
      console.log(`⚡ Database "${DB_NAME}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${DB_NAME}";`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }

    await client.end();
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  }
};


// start the TypeORM Data Source after ensuring the database exists
const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: false, // do not set to true in production
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
});

export default AppDataSource; //TypeORM requires this do not remove

export { createDatabaseIfNotExists };
