import "reflect-metadata";
import AppDataSource from "./database/data-source";
import { createDatabaseIfNotExists } from "./database/data-source";
import app from "./app";

// ✅ Function to check if database creation is needed
const shouldCreateDatabase = async (): Promise<boolean> => {
    try {
        await createDatabaseIfNotExists();
        return true;
    } catch (error) {
        console.log("❌ Database check failed, assuming production mode.");
        return false;
    }
};

// ✅ Start server after checking the database
const startServer = () => {
    app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
};

// ✅ Initialize TypeORM and conditionally create the database
(async () => {
    try {
        const dbNeedsCreation = await shouldCreateDatabase();

        if (dbNeedsCreation) {
            console.log("⚡ Database checked/created. Initializing TypeORM...");
        } else {
            console.log("🚀 Skipping database creation (running in production mode or DB exists).");
        }

        await AppDataSource.initialize();
        console.log("✅ Database initialized successfully");

        startServer();
    } catch (error) {
        console.error("❌ Failed to initialize database:", error);
        process.exit(1);
    }
})();
