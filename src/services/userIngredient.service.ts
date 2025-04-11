import { UserIngredient } from "../entities/UserIngredient";
import userIngredientRepository from "../repositories/userIngredientRepository";
import ingredientRepository from "../repositories/ingredientRepository";
import profileRepository from "../repositories/profileRepository";
import createHttpError from "http-errors";
import {
  UpdateUserIngredientDTO,
  UserIngredientInput,
} from "types/userIngredient";

export const addUserIngredient = async (
  userIngredient: UserIngredientInput
): Promise<UserIngredient> => {
  const user = await profileRepository.findProfileById(userIngredient.userId);
  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }

  const ingredient = await ingredientRepository.getIngredientById(
    userIngredient.ingredientId
  );

  if (!ingredient) {
    throw new createHttpError.NotFound("Ingredient not found");
  }

  // Only check for duplicates if there's no expiration date (non-expiring pantry item).
  // If expiryDate exists, we allow multiple batches of the same ingredient.
  if (!userIngredient.expiry_date) {
    const existingUserIngredient =
      await userIngredientRepository.findUserIngredient(
        user.id,
        userIngredient.ingredientId
      );

    if (existingUserIngredient) {
      throw new createHttpError.Conflict("User already has this ingredient");
    }
  }

  return await userIngredientRepository.addUserIngredient(
    user.id,
    ingredient,
    userIngredient.unitQuantity,
    userIngredient.totalAmount,
    userIngredient.unitType,
    userIngredient.expiry_date
  );
};

export const getUserIngredients = async (
  userid: string
): Promise<UserIngredient[]> => {
  const user = await profileRepository.findProfileById(userid);

  if (!user) {
    throw new createHttpError.NotFound("User not found");
  }

  return await userIngredientRepository.getUserIngredients(userid);
};

export const getUserIngredientById = async (
  id: string
): Promise<UserIngredient | null> => {
  return await userIngredientRepository.getUserIngredientById(id);
};

export const getUserIngredientByIngredientId = async (
  userId: string,
  ingredientId: string
): Promise<UserIngredient | null> => {
  return await userIngredientRepository.findUserIngredient(
    userId,
    ingredientId
  );
};

export const updateUserIngredient = async (
  id: string,
  updatedIngredient: UpdateUserIngredientDTO
): Promise<UserIngredient> => {
  const userIngredient = await userIngredientRepository.getUserIngredientById(
    id
  );

  if (!userIngredient) {
    throw new createHttpError.NotFound("User ingredient not found.");
  }

  if (updatedIngredient.unitQuantity !== undefined) {
    if (
      typeof updatedIngredient.unitQuantity !== "number" ||
      updatedIngredient.unitQuantity < 0
    ) {
      throw new createHttpError.BadRequest(
        "Unit quantity must be a non-negative number."
      );
    }
  }

  if (updatedIngredient.totalAmount !== undefined) {
    if (
      updatedIngredient.totalAmount !== null &&
      (typeof updatedIngredient.totalAmount !== "number" ||
        updatedIngredient.totalAmount < 0)
    ) {
      throw new createHttpError.BadRequest(
        "Total amount must be a non-negative number or null."
      );
    }
  }

  if (updatedIngredient.unitType !== undefined) {
    if (
      typeof updatedIngredient.unitType !== "string" ||
      updatedIngredient.unitType.length > 50
    ) {
      throw new createHttpError.BadRequest(
        "Unit type must be a string with a maximum length of 50 characters."
      );
    }
  }

  if (updatedIngredient.expiry_date !== undefined) {
    if (
      updatedIngredient.expiry_date !== null &&
      isNaN(new Date(updatedIngredient.expiry_date).getTime())
    ) {
      throw new createHttpError.BadRequest(
        "Expiry date must be a valid date or null."
      );
    }
  }

  Object.assign(userIngredient, updatedIngredient);

  return await userIngredientRepository.updateUserIngredient(userIngredient);
};

export const deleteUserIngredient = async (ids: string[]): Promise<void> => {
  console.log("service", ids);

  if (!Array.isArray(ids) || ids.length === 0) {
    throw new createHttpError.BadRequest("No user ingredient IDs provided.");
  }

  for (const id of ids) {
    const userIngredient = await userIngredientRepository.getUserIngredientById(
      id
    );
    if (!userIngredient) {
      throw new createHttpError.NotFound(
        `User ingredient not found for ID: ${id}`
      );
    }
  }

  await userIngredientRepository.deleteUserIngredient(ids);
};

export const quickRestockUserIngredient = async (
  userIngredientId: string
): Promise<UserIngredient> => {
  const userIngredient =
    await userIngredientRepository.getUserIngredientByIdQuickRestock(
      userIngredientId
    );

  if (!userIngredient) {
    throw new createHttpError.NotFound("User ingredient not found.");
  }

  const ingredient = await ingredientRepository.getIngredientById(
    userIngredient.ingredient.Ing_id
  );

  if (!ingredient) {
    throw new createHttpError.NotFound("Ingredient not found.");
  }

  userIngredient.unitQuantity += 1;
  userIngredient.totalAmount =
    (Number(userIngredient.totalAmount) || 0) + (ingredient.Ing_quantity || 0);

  return await userIngredientRepository.updateUserIngredient(userIngredient);
};

export default {
  addUserIngredient,
  getUserIngredients,
  getUserIngredientById,
  updateUserIngredient,
  deleteUserIngredient,
  getUserIngredientByIngredientId,
  quickRestockUserIngredient,
};
