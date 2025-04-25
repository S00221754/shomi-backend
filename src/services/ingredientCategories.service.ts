import ingredientCategoryRepository from "../repositories/ingredientCategoriesRepository";

// get ingredient categories
export const getIngredientCategories = async () => {
  return await ingredientCategoryRepository.getAllIngredientCategories();
};

export default {
  getIngredientCategories,
};
