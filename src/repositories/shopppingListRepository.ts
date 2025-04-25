import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { ShoppingList } from "../entities/ShoppingList";

const shoppingListRepo: Repository<ShoppingList> =
  AppDataSource.getRepository(ShoppingList);

// get all shopping list items for a user
export const getShoppingListForUser = async (
  userId: string
): Promise<ShoppingList[]> => {
  return await shoppingListRepo.find({
    where: { user_id: userId },
    relations: ["ingredient"],
    order: { Shop_created_at: "DESC" },
  });
};

// add a new shopping list item
export const addShoppingListItem = async (
  item: Partial<ShoppingList>
): Promise<ShoppingList> => {
  const newItem = shoppingListRepo.create(item);
  return await shoppingListRepo.save(newItem);
};

// delete a shopping list item
export const deleteShoppingListItem = async (id: string): Promise<void> => {
  await shoppingListRepo.delete(id);
};

// update a shopping list item
export const updateShoppingListItem = async (
  id: string,
  update: Partial<ShoppingList>
): Promise<ShoppingList> => {
  await shoppingListRepo.update(id, update);
  return await shoppingListRepo.findOneOrFail({ where: { Shop_id: id } });
};

// find a shopping list item by user id and ingredient id
export const findShoppingListItem = async (
  userId: string,
  ingredientId: number
): Promise<ShoppingList | null> => {
  return await shoppingListRepo.findOne({
    where: { user_id: userId, ingredient_id: ingredientId },
  });
};

// get a shopping list item by id
export const getShoppingListItemById = async (
  id: string
): Promise<ShoppingList | null> => {
  return await shoppingListRepo.findOne({
    where: { Shop_id: id },
    relations: ["ingredient"],
  });
};

export default {
  getShoppingListForUser,
  addShoppingListItem,
  deleteShoppingListItem,
  updateShoppingListItem,
  findShoppingListItem,
  getShoppingListItemById,
};
