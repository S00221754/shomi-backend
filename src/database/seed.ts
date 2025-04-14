import { IngredientCategory } from "../entities/IngredientCategories";
import { UnitType } from "../entities/UnitType";
import AppDataSource from "./data-source";

console.log("🔥 SEED SCRIPT STARTED");

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
  "unit",
  "serving",
];

const defaultIngredientCategories = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Spices & Herbs",
  "Condiments",
  "Baking",
  "Pantry Staples",
  "Uncategorized",
];

export const seedUnitTypes = async () => {
  console.log("Seeding unit types...");

  const repo = AppDataSource.getRepository(UnitType);

  for (const name of defaultUnitTypes) {
    const exists = await repo.findOneBy({ name });
    if (!exists) {
      await repo.save(repo.create({ name }));
    }
  }
};

export const seedIngredientCategories = async () => {
  const repo = AppDataSource.getRepository(IngredientCategory);

  for (const name of defaultIngredientCategories) {
    const exists = await repo.findOneBy({ name });
    if (!exists) {
      await repo.save(repo.create({ name }));
    }
  }
};
