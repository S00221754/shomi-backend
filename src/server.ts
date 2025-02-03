import http from 'http';
import app from './app';
import { createDatabaseIfNotExists } from './database/data-source';
import dotenv from 'dotenv';

dotenv.config()

const server = http.createServer(app);
const ENV = process.env.NODE_ENV ?? "development";

// figure out a better way to do this without relying on environment variables
if (ENV !== "production") {
    createDatabaseIfNotExists()
      .then(() => {
        server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
      })
      .catch((error) => {
        console.error("❌ Failed to initialize database:", error);
        process.exit(1);
      });
  } else {
    console.log("🚀 Running in production mode. Skipping database creation.");
    server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
  }
