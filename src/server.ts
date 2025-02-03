import http from 'http';
import app from './app';
import { createDatabaseIfNotExists } from './database/data-source';

const server = http.createServer(app);

createDatabaseIfNotExists()
  .then(() => {
    app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
