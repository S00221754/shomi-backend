import { IngredientInput } from "types/ingredient";
import ingredientRepository from "../repositories/ingredientRepository";
import createHttpError from 'http-errors';

// Create ingredient
const createIngredient = async (ingredient: IngredientInput) => {
    const existingIngredient = await ingredientRepository.ingredientExists(ingredient.ING_Name, ingredient.ING_BrandName, ingredient.ING_Barcode);

    // if ingredient already exists, potentially pop up saying this item is already in the database would you like to add it to your pantry?
    if (existingIngredient) {
        throw new createHttpError.BadRequest("Ingredient already exists");
    }

    const result = await ingredientRepository.addIngredient(ingredient);

    if (!result) {
        throw new createHttpError.InternalServerError();
    }

    return result;
};

export default { createIngredient };