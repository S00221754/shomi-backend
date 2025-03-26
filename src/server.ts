import "reflect-metadata";
import AppDataSource from "./database/data-source";
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(PORT);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

startServer();
