import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UserIngredient } from "../entities/UserIngredient";
import { Ingredient } from "../entities/Ingredient";
import { Profile } from "../entities/Profile";

const userIngredientRepo: Repository<UserIngredient> = AppDataSource.getRepository(UserIngredient);

// Add a new user ingredient
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

// Find a user ingredient by user ID and ingredient ID
export const findUserIngredient = async (userId: string, ingredientId: string): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      user: { id: userId },
      ingredient: { Ing_id: ingredientId },
    },
    relations: ["ingredient"], // this includes the ingredient data in the result
  });
};

// Find all user ingredients by ingredient ID
export const findAllUserIngredientsByIngredient = async (
  userId: string,
  ingredientId: string
): Promise<UserIngredient[]> => {
  return await userIngredientRepo.find({
    where: {
      user: { id: userId },
      ingredient: { Ing_id: ingredientId },
    },
    relations: ["ingredient"],
  });
};

// Get all user ingredients for a specific user
export const getUserIngredients = async (userid: string): Promise<UserIngredient[]> => {
  return await userIngredientRepo.find({
    where: {
      user: { id: userid },
    },
    relations: ["ingredient", "ingredient.category"],
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
        Ing_keywords: true,
        category: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// get paginated user ingredients
export const getPaginatedUserIngredients = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: UserIngredient[]; total: number }> => {
  const [data, total] = await userIngredientRepo.findAndCount({
    where: {
      user: { id: userId },
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
    skip: (page - 1) * limit,
    take: limit,
    order: {
      ingredient: {
        Ing_name: "ASC",
      },
    },
  });

  return { data, total };
};

// Get a user ingredient by ID
export const getUserIngredientById = async (id: string): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      id: id,
    },
    relations: ["user", "ingredient"],
  });
};

// Get a user ingredient by ID for quick restock (deprecated)
export const getUserIngredientByIdQuickRestock = async (id: string): Promise<UserIngredient | null> => {
  return await userIngredientRepo.findOne({
    where: {
      id: id,
    },
    relations: ["ingredient"],
  });
};

// Update a user ingredient
export const updateUserIngredient = async (userIngredient: UserIngredient): Promise<UserIngredient> => {
  return await userIngredientRepo.save(userIngredient);
};

// Delete a user ingredient by ID
export const deleteUserIngredient = async (ids: string[]): Promise<void> => {
  await userIngredientRepo.delete(ids);
};

export default {
  addUserIngredient,
  findUserIngredient,
  findAllUserIngredientsByIngredient,
  getUserIngredients,
  getPaginatedUserIngredients,
  updateUserIngredient,
  getUserIngredientById,
  deleteUserIngredient,
  getUserIngredientByIdQuickRestock,
};
