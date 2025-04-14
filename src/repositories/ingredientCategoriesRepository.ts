import AppDataSource from "../database/data-source";
import { IngredientCategory } from "../entities/IngredientCategories";

const repo = AppDataSource.getRepository(IngredientCategory);

export const getAllIngredientCategories = async (): Promise<
  IngredientCategory[]
> => {
  return await repo.find({ order: { name: "ASC" } });
};

export default {
  getAllIngredientCategories,
};
