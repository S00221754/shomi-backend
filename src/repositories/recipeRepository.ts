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
  // need to fix this to only call the repo no need to call new recipe.
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

// add pagination
export const getRecipes = async (): Promise<Recipe[]> => {
  return await RecipeRepo.find();
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

export const getRecommendedRecipes = async (
  userId: string,
  ingredientsIdsArray: string[]
): Promise<Recipe[]> => {
  return await RecipeRepo.createQueryBuilder("recipe")
    .innerJoin("user_ingredients", "ui", `"ui"."user_id" = :userId`, { userId })
    .where(
      ingredientsIdsArray.length > 0
        ? `EXISTS (
                    SELECT 1 FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
                    WHERE recipe_ing->>'ingredient_id'::text IN (:...ingredientsIdsArray)
                )`
        : `EXISTS (
                    SELECT 1 FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
                    WHERE recipe_ing->>'ingredient_id' IN (
                        SELECT ingredient_id::text FROM "user_ingredients" WHERE user_id = :userId
                    )
                )`
    )
    .addSelect(
      ingredientsIdsArray.length > 0
        ? `(
                    SELECT COUNT(*) 
                    FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
                    WHERE recipe_ing->>'ingredient_id'::text IN (:...ingredientsIdsArray)
                )`
        : "0",
      "selected_match_count"
    )
    .addSelect(
      `(
            SELECT COUNT(*) 
            FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
            WHERE recipe_ing->>'ingredient_id'::text IN (
                SELECT ingredient_id::text FROM "user_ingredients" WHERE user_id = :userId
            )
        )`,
      "pantry_match_count"
    )
    .orderBy(
      ingredientsIdsArray.length > 0
        ? "selected_match_count"
        : "pantry_match_count",
      "DESC"
    )
    .setParameter(
      "ingredientsIdsArray",
      ingredientsIdsArray.length > 0 ? ingredientsIdsArray : ["dummy_value"]
    )
    .getMany();
};

// below are possible endpoints to make
// GET /recipes?=search - search for recipes
// GET /recipes?=filter - filter recipes
// GET /recipes?=sort - sort recipes

export default {
  addRecipe,
  findRecipeById,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  getRecommendedRecipes,
};
