import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { Recipe } from "../entities/Recipe";
import { CreateRecipeDTO, UpdateRecipeDTO } from "types/recipe";
const RecipeRepo: Repository<Recipe> = AppDataSource.getRepository(Recipe);

// add recipe
export const addRecipe = async (recipe: CreateRecipeDTO): Promise<Recipe> => {
    const newRecipe = RecipeRepo.create(recipe);
    return await RecipeRepo.save(newRecipe);
}

// find recipe by id
export const findRecipeById = async (id: string): Promise<Recipe | undefined> => {
    return await RecipeRepo.findOne({ where: { recipe_id: id } });
}

// add pagination
export const getRecipes = async (): Promise<Recipe[]> => {
    return await RecipeRepo.find();
}

// update recipe
export const updateRecipe = async (recipe : Recipe): Promise<Recipe> => {
    return await RecipeRepo.save(recipe);
};

// delete recipe
export const deleteRecipe = async (id: string): Promise<void> => {
    await RecipeRepo.delete({ recipe_id: id });
};

export const getRecommendedRecipes = async (userId: string): Promise<Recipe[]> => {
    return await RecipeRepo.createQueryBuilder("recipe")
        .innerJoin(`tbl_UserIngredients`, "ui", `"ui"."user_id" = :userId`, { userId })// Fix quotes
        .where(`
            EXISTS (
                SELECT 1 FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
                WHERE recipe_ing->>'ingredient_id'::text IN (
                    SELECT ingredient_id::text FROM "tbl_UserIngredients" WHERE user_id = :userId
                )
            )
        `)
        .addSelect(`
            (
                SELECT COUNT(*) 
                FROM jsonb_array_elements(recipe.ingredients) AS recipe_ing
                WHERE recipe_ing->>'ingredient_id'::text IN (
                    SELECT ingredient_id::text FROM "tbl_UserIngredients" WHERE user_id = :userId
                )
            )`, "match_count"
        )
        .orderBy("match_count", "DESC")
        .getMany();
};





// below are possible endpoints to make
// GET /recipes?=search - search for recipes
// GET /recipes?=filter - filter recipes
// GET /recipes?=sort - sort recipes

export default { addRecipe, findRecipeById, getRecipes, updateRecipe, deleteRecipe, getRecommendedRecipes };


