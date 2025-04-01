import { UnitType } from "../entities/UnitType";
import AppDataSource from "./data-source";

const defaultUnitTypes = [
  "g", "kg", "mg", "oz", "lb",
  "ml", "l", "tsp", "tbsp", "cup",
  "pinch", "slice", "clove", "can",
  "pack", "bottle", "jar", "piece", "unit", "serving"
];

export const seedUnitTypes = async () => {
  const repo = AppDataSource.getRepository(UnitType);

  for (const name of defaultUnitTypes) {
    const exists = await repo.findOneBy({ name });
    if (!exists) {
      await repo.save(repo.create({ name }));
    }
  }
};
