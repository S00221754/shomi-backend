import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { ShoppingList } from "../entities/ShoppingList";

const shoppingListRepo: Repository<ShoppingList> =
  AppDataSource.getRepository(ShoppingList);

export const getShoppingListForUser = async (
  userId: string
): Promise<ShoppingList[]> => {
  return await shoppingListRepo.find({
    where: { user_id: userId },
    relations: ["ingredient"],
    order: { Shop_created_at: "DESC" },
  });
};

export const addShoppingListItem = async (
  item: Partial<ShoppingList>
): Promise<ShoppingList> => {
  const newItem = shoppingListRepo.create(item);
  return await shoppingListRepo.save(newItem);
};

export const deleteShoppingListItem = async (id: string): Promise<void> => {
  await shoppingListRepo.delete(id);
};

export const updateShoppingListItem = async (
  id: string,
  update: Partial<ShoppingList>
): Promise<ShoppingList> => {
  await shoppingListRepo.update(id, update);
  return await shoppingListRepo.findOneOrFail({ where: { Shop_id: id } });
};

export const findShoppingListItem = async (
  userId: string,
  ingredientId: number
): Promise<ShoppingList | null> => {
  return await shoppingListRepo.findOne({
    where: { user_id: userId, ingredient_id: ingredientId },
  });
};

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
