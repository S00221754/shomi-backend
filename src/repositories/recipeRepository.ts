import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { Recipe } from "../entities/Recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "types/recipe";
import { Profile } from "entities/Profile";
const RecipeRepo: Repository<Recipe> = AppDataSource.getRepository(Recipe);

// add recipe
export const addRecipe = async (
  data: CreateRecipeDTO,
  author: Profile
): Promise<Recipe> => {
  const recipe = new Recipe();

  recipe.recipe_name = data.recipe_name;
  recipe.recipe_description = data.recipe_description;
  recipe.recipe_instructions = data.recipe_instructions;
  recipe.ingredients = data.ingredients;
  recipe.cooking_time = data.cooking_time;
  recipe.recipe_images = data.recipe_images;

  recipe.author = author;

  return await RecipeRepo.save(recipe);
};

// find recipe by id
export const findRecipeById = async (
  id: string
): Promise<Recipe | undefined> => {
  const result = await RecipeRepo.createQueryBuilder("recipe")
    .leftJoinAndSelect("recipe.author", "author")
    .select(["recipe", "author.id", "author.full_name"])
    .where("recipe.recipe_id = :id", { id })
    .getOne();

  return result;
};

// get recipes with pagination
export const getRecipes = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: Recipe[]; total: number }> => {
  const [data, total] = await RecipeRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { created_at: "DESC" },
  });

  return { data, total };
};

// update recipe
export const updateRecipe = async (
  recipe: Recipe,
  author: Profile
): Promise<Recipe> => {
  recipe.author = author;

  // This will update instead of insert, because recipe already has an ID
  return await RecipeRepo.save(recipe);
};

// delete recipe
export const deleteRecipe = async (id: string): Promise<void> => {
  await RecipeRepo.delete({ recipe_id: id });
};

export default {
  addRecipe,
  findRecipeById,
  getRecipes,
  updateRecipe,
  deleteRecipe,
};
