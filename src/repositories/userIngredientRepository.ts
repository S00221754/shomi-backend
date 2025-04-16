import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UserIngredient } from "../entities/UserIngredient";
import { Ingredient } from "../entities/Ingredient";
import { Profile } from "../entities/Profile";

const userIngredientRepo: Repository<UserIngredient> =
  AppDataSource.getRepository(UserIngredient);

export const addUserIngredient = async (
  userId: string,
  ingredient: Ingredient,
  unitQuantity: number,
  totalAmount: number,
  unitType: string,
  expiryDate?: Date
): Promise<UserIngredient> => {
  const newUserIngredient = userIngredientRepo.create({
    user: { id: userId } as Profile,
    ingredient,
    unitQuantity: unitQuantity || 1,
    totalAmount: totalAmount || null,
    unitType: unitType || null,
    expiry_date: expiryDate || null,
  });

  return await userIngredientRepo.save(newUserIngredient);
};

export const findUserIngredient = async (
  userId: string,
  ingredientId: string
): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      user: { id: userId },
      ingredient: { Ing_id: ingredientId },
    },
    relations: ["ingredient"], // this includes the ingredient data in the result
  });
};

export const getUserIngredients = async (
  userid: string
): Promise<UserIngredient[]> => {
  return await userIngredientRepo.find({
    where: {
      user: { id: userid },
    },
    relations: ["ingredient"],
    select: {
      id: true,
      unitQuantity: true,
      totalAmount: true,
      unitType: true,
      expiry_date: true,
      added_at: true,
      ingredient: {
        Ing_id: true,
        Ing_name: true,
        Ing_quantity: true,
        Ing_quantity_units: true,
      },
    },
  });
};

export const getUserIngredientById = async (
  id: string
): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      id: id,
    },
  });
};

export const getUserIngredientByIdQuickRestock = async (
  id: string
): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      id: id,
    },
    relations: ["ingredient"],
  });
};

export const updateUserIngredient = async (
  userIngredient: UserIngredient
): Promise<UserIngredient> => {
  return await userIngredientRepo.save(userIngredient);
};

export const deleteUserIngredient = async (ids: string[]): Promise<void> => {
  await userIngredientRepo.delete(ids);
};

export default {
  addUserIngredient,
  findUserIngredient,
  getUserIngredients,
  updateUserIngredient,
  getUserIngredientById,
  deleteUserIngredient,
  getUserIngredientByIdQuickRestock,
};
