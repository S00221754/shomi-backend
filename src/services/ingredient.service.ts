import { IngredientInput } from "types/ingredient";
import ingredientRepository from "../repositories/ingredientRepository";
import createHttpError from "http-errors";

// Create ingredient
const createIngredient = async (ingredient: IngredientInput) => {
  const existingIngredient = await ingredientRepository.ingredientExists(
    ingredient.Ing_name,
    ingredient.Ing_brand,
    ingredient.Ing_barcode
  );

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
};

// get ingredient by id
const getIngredientById = async (id: string) => {
  const result = await ingredientRepository.getIngredientById(id);

  if (!result) {
    throw new createHttpError.NotFound();
  }

  return result;
};

// get paginated ingredients
const getPaginatedIngredients = async (page: number, limit: number) => {
  const result = await ingredientRepository.getPaginatedIngredients(
    page,
    limit
  );

  return result;
};

// edit an ingredient
const editIngredient = async (
  id: string,
  editedIngredient: IngredientInput
) => {
  const existingIngredient = await ingredientRepository.getIngredientById(id);

  if (!existingIngredient) {
    throw new createHttpError.NotFound();
  }

  const result = await ingredientRepository.editIngredient(
    id,
    editedIngredient
  );

  if (!result) {
    throw new createHttpError.InternalServerError();
  }

  return result;
};

// delete an ingredient
const deleteIngredient = async (id: string) => {
  const existingIngredient = await ingredientRepository.getIngredientById(id);

  if (!existingIngredient) {
    throw new createHttpError.NotFound();
  }

  const result = await ingredientRepository.deleteIngredient(id);

  if (!result) {
    throw new createHttpError.InternalServerError();
  }

  return result;
};

// there needs to be additional checks as the barcode is not unique for need to add barcode type to help uniquely identify the ingredient but for demo purposes this will do.
const getIngredientByBarcode = async (barcode: string) => {
  const result = await ingredientRepository.findIngredientByBarcode(barcode);

  if (!result) {
    return null;
  }

  return result;
};

export default {
  createIngredient,
  getIngredients,
  getIngredientById,
  getPaginatedIngredients,
  editIngredient,
  deleteIngredient,
  getIngredientByBarcode,
};
