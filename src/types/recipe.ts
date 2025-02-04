import { RecipeIngredient } from "./recipeIngredient";

export type CreateRecipeDTO = {
    recipe_name: string;
    recipe_description: string;
    recipe_instructions: string;
    ingredients: RecipeIngredient[];
    cooking_time: number;
    author_id: string;
}

export class UpdateRecipeDTO {
    recipe_name?: string;
    recipe_description?: string;
    recipe_instructions?: string;
    ingredients?: RecipeIngredient[];
    cooking_time?: number;
}