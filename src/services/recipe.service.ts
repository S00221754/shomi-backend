import userRepository from "../repositories/userRepository";
import createHttpError from "http-errors";
import { Recipe } from "entities/Recipe";
import recipeRepository from "../repositories/recipeRepository";
import { CreateRecipeDTO, UpdateRecipeDTO } from "types/recipe";
import ingredientRepository from "../repositories/ingredientRepository";

const requiredFields: { key: keyof CreateRecipeDTO; label: string }[] = [
    { key: "recipe_name", label: "Recipe Name" },
    { key: "recipe_description", label: "Recipe Description" },
    { key: "cooking_time", label: "Cooking Time" },
    { key: "author_id", label: "Author ID" },
];

// looking into a better way to do the validation for the backend


export const addRecipe = async (recipe: CreateRecipeDTO): Promise<Recipe> => {

    // Check if all required fields are present
    const missingFields = requiredFields
    .filter(field => !recipe[field.key])
    .map(field => field.label);
    
    if (missingFields.length > 0) {
        throw new createHttpError.BadRequest(`Missing required fields: ${missingFields.join(", ")}.`);
    }

    if(recipe.cooking_time <= 0){
        throw new createHttpError.BadRequest("Cooking time must be a positive number.");
    }

    if(!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0){
        throw new createHttpError.BadRequest("Recipe must have at least one ingredient.");
    }

    for (const ingredient of recipe.ingredients) {
        const ingredientExists = await ingredientRepository.getIngredientById(ingredient.ingredient_id);

        if (!ingredientExists) {
            throw new createHttpError.NotFound(`Ingredient with ID ${ingredient.ingredient_id} not found.`);
        }
    }

    const user = await userRepository.findUserById(recipe.author_id);

    if(!user){
        throw new createHttpError.NotFound("User not found.");
    }

    return await recipeRepository.addRecipe(recipe);
};

export const getRecipes = async (): Promise<Recipe[]> => {
    return await recipeRepository.getRecipes();
};

export const findRecipeById = async (id: string): Promise<Recipe | undefined> => {
    const result = await recipeRepository.findRecipeById(id);

    if (!result) {
        throw new createHttpError.NotFound("Recipe not found.");
    }

    return result;
};

export const updateRecipe = async (id: string, updatedRecipe: UpdateRecipeDTO): Promise<Recipe> => {
    const recipe = await recipeRepository.findRecipeById(id);

    if (!recipe) {
        throw new createHttpError.NotFound("Recipe not found.");
    }


    const fieldsToCheck: { key: keyof UpdateRecipeDTO; label: string }[] = [
        { key: "recipe_name", label: "Recipe name" },
        { key: "recipe_description", label: "Recipe description" },
        { key: "recipe_instructions", label: "Recipe instructions" }
    ];

    for (const field of fieldsToCheck) {
        const value = updatedRecipe[field.key];
        if (typeof value === "string" && value.trim() === "") {
            throw new createHttpError.BadRequest(`${field.label} cannot be empty.`);
        }
    }

    if (updatedRecipe.cooking_time !== undefined && updatedRecipe.cooking_time <= 0) {
        throw new createHttpError.BadRequest("Cooking time must be a positive number.");
    }

    if (updatedRecipe.ingredients !== undefined) {
        if (!Array.isArray(updatedRecipe.ingredients) || updatedRecipe.ingredients.length === 0) {
            throw new createHttpError.BadRequest("Recipe must have at least one ingredient.");
        }
    }

    if (updatedRecipe.ingredients) {
        for (const ingredient of updatedRecipe.ingredients) {
            if (ingredient.quantity <= 0) {
                throw new createHttpError.BadRequest(`Ingredient quantity of ${ingredient.ingredient_name}  must be a positive number.`);
            }
        }
    }

    for (const ingredient of updatedRecipe.ingredients) {
        const ingredientExists = await ingredientRepository.getIngredientById(ingredient.ingredient_id);

        if (!ingredientExists) {
            throw new createHttpError.NotFound(`Ingredient with ID ${ingredient.ingredient_id} not found.`);
        }
    }

    Object.assign(recipe, updatedRecipe);
    return await recipeRepository.updateRecipe(recipe);
};

export const deleteRecipe = async (id: string): Promise<void> => {
    const recipe = await findRecipeById(id);

    if(!recipe){
        throw new createHttpError.NotFound("Recipe not found.");
    }

    await recipeRepository.deleteRecipe(id);
};

export const getRecommendedRecipes = async (userId: string): Promise<Recipe[]> => {
    const user = await userRepository.findUserById(userId);

    if(!user){
        throw new createHttpError.NotFound("User not found.");
    }

    return await recipeRepository.getRecommendedRecipes(userId);
};

export default { addRecipe, getRecipes, findRecipeById, updateRecipe, deleteRecipe, getRecommendedRecipes };

