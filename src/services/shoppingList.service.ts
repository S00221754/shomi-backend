import createHttpError from "http-errors";
import shoppingListRepository from "../repositories/shopppingListRepository";
import ingredientRepository from "../repositories/ingredientRepository";
import userIngredientRepository from "../repositories/userIngredientRepository";
import { ShoppingList } from "../entities/ShoppingList";

// Get all shopping list items for a user
export const getShoppingListForUser = async (
  userId: string
): Promise<ShoppingList[]> => {
  return await shoppingListRepository.getShoppingListForUser(userId);
};

// Add a new item to the shopping list
export const addShoppingListItem = async (
  data: Partial<ShoppingList>
): Promise<ShoppingList> => {
  const existingItem = await shoppingListRepository.findShoppingListItem(
    data.user_id!,
    data.ingredient_id!
  );

  if (existingItem) {
    throw new createHttpError.Conflict(
      "Item already exists in the shopping list."
    );
  }

  return await shoppingListRepository.addShoppingListItem(data);
};

// Update an item in the shopping list
export const updateShoppingListItem = async (
  id: string,
  updates: Partial<ShoppingList>
): Promise<ShoppingList> => {
  const existingItem = await shoppingListRepository.getShoppingListItemById(id);

  if (!existingItem) {
    throw new createHttpError.NotFound("Shopping list item not found.");
  }

  return await shoppingListRepository.updateShoppingListItem(id, updates);
};

//Delete an item from the shopping list
export const deleteShoppingListItem = async (id: string): Promise<void> => {
  const item = await shoppingListRepository.getShoppingListItemById(id);

  if (!item) {
    throw new createHttpError.NotFound("Shopping list item not found.");
  }

  await shoppingListRepository.deleteShoppingListItem(id);
};

// This method will replace the quick restock method and the quick resetock will be repurposed to be a add to shopping list button
export const markShoppingListItemAsBought = async (
  id: string
): Promise<void> => {
  const shoppingItem = await shoppingListRepository.getShoppingListItemById(id);

  if (!shoppingItem) {
    throw new createHttpError.NotFound("Shopping list item not found");
  }

  const ingredient = await ingredientRepository.getIngredientById(
    shoppingItem.ingredient_id.toString()
  );

  if (
    !ingredient ||
    !ingredient.Ing_quantity_units ||
    !ingredient.Ing_quantity
  ) {
    throw new createHttpError.BadRequest(
      "Ingredient is missing required quantity or unit information."
    );
  }

  const baseUnit = ingredient.Ing_quantity_units;
  const unitQuantityToAdd = shoppingItem.Shop_quantity;
  const totalAmountToAdd = unitQuantityToAdd * ingredient.Ing_quantity;

  const existingPantryItem = await userIngredientRepository.findUserIngredient(
    shoppingItem.user_id,
    shoppingItem.ingredient_id.toString()
  );

  // No pantry item exists
  if (!existingPantryItem) {
    await userIngredientRepository.addUserIngredient(
      shoppingItem.user_id,
      ingredient,
      unitQuantityToAdd,
      totalAmountToAdd,
      baseUnit,
      null
    );
  }

  // Pantry items existst but no expiry tracking
  else if (!existingPantryItem.expiry_date) {
    existingPantryItem.unitQuantity += unitQuantityToAdd;
    existingPantryItem.totalAmount += totalAmountToAdd;
    await userIngredientRepository.updateUserIngredient(existingPantryItem);
  }

  // Pantry items exist with expiry tracking
  else {
    throw new createHttpError.Conflict(
      "Multiple expiry batches exist. Prompt user to add to a batch or create a new one."
    );
  }

  // Delete from shopping list
  await shoppingListRepository.deleteShoppingListItem(shoppingItem.Shop_id);
};

export default {
  getShoppingListForUser,
  addShoppingListItem,
  updateShoppingListItem,
  deleteShoppingListItem,
  markShoppingListItemAsBought,
};
