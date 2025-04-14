import AppDataSource from "./data-source";
import { seedUnitTypes, seedIngredientCategories } from "./seed";

AppDataSource.initialize()
  .then(async () => {
    console.log("Running migrations...");
    await AppDataSource.runMigrations();
    console.log("Migrations complete.");

    console.log("Seeding unit types...");
    await seedUnitTypes();
    console.log("Unit types seeded.");

    console.log("Seeding ingredient categories...");
    await seedIngredientCategories();
    console.log("Ingredient categories seeded.");

    console.log("Seeding complete.");

    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration/Seeding error:", err);
    process.exit(1);
  });
