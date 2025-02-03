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

// get ingredients
const getIngredients = async () => {
    const result = await ingredientRepository.getIngredients();
    return result;
}

// get ingredient by id
const getIngredientById = async (id: string) => {
    const result = await ingredientRepository.getIngredientById(id);

    if(!result){
      throw new createHttpError.NotFound();
    }

    return result;
}

// edit an ingredient
const editIngredient = async (id: string, editedIngredient: IngredientInput) => {

    const existingIngredient = await ingredientRepository.getIngredientById(id);

    if(!existingIngredient){
      throw new createHttpError.NotFound();
    }

    const result = await ingredientRepository.editIngredient(id,editedIngredient);

    if(!result){
      throw new createHttpError.InternalServerError();
    }

    return result;
};

// delete an ingredient
const deleteIngredient = async (id: string) => {

    const existingIngredient = await ingredientRepository.getIngredientById(id);

    if(!existingIngredient){
      throw new createHttpError.NotFound();
    }

    const result = await ingredientRepository.deleteIngredient(id);

    if(!result){
      throw new createHttpError.InternalServerError();
    }

    return result;
};

export default { createIngredient, getIngredients, getIngredientById, editIngredient, deleteIngredient };