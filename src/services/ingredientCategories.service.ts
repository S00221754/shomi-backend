import ingredientCategoryRepository from "../repositories/ingredientCategoriesRepository";

export const getIngredientCategories = async () => {
  return await ingredientCategoryRepository.getAllIngredientCategories();
};

export default {
  getIngredientCategories,
};
