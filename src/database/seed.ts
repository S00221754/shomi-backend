import AppDataSource from "./data-source";
import { UnitType } from "../entities/UnitType";

const defaultUnitTypes = [
  "g",
  "kg",
  "mg",
  "oz",
  "lb",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "pinch",
  "slice",
  "clove",
  "can",
  "pack",
  "bottle",
  "jar",
  "piece",
  "serving",
  "unit"
];

AppDataSource.initialize()
  .then(async () => {
    console.log("Running seed script for unit types...");

    const unitTypeRepo = AppDataSource.getRepository(UnitType);

    for (const name of defaultUnitTypes) {
      const existing = await unitTypeRepo.findOneBy({ name });

      if (!existing) {
        const unit = unitTypeRepo.create({ name });
        await unitTypeRepo.save(unit);
        console.log(`Seeded unit type: ${name}`);
      } else {
        console.log(`Unit type already exists: ${name}`);
      }
    }

    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
