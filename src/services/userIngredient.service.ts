import { UserIngredient } from "../entities/UserIngredient";
import userIngredientRepository from "../repositories/userIngredientRepository";
import ingredientRepository from '../repositories/ingredientRepository';
import userRepository from '../repositories/userRepository';
import createHttpError from 'http-errors';
import { UpdateUserIngredientDTO, UserIngredientInput } from "types/userIngredient";


export const addUserIngredient = async (userIngredient: UserIngredientInput): Promise<UserIngredient> => {
    const user = await userRepository.findUserById(userIngredient.userId);
    if (!user) {
        throw new createHttpError.NotFound('User not found');
    }

    const ingredient = await ingredientRepository.getIngredientById(userIngredient.ingredientId);

    if (!ingredient) {
        throw new createHttpError.NotFound('Ingredient not found');
    }

    const existingUserIngredient = await userIngredientRepository.findUserIngredient(user.user_id, ingredient.Ing_id);

    console.log(existingUserIngredient);
    
    if (existingUserIngredient) {
        throw new createHttpError.Conflict('User already has this ingredient');
    }

    return await userIngredientRepository.addUserIngredient(user, ingredient, userIngredient.unitQuantity, userIngredient.totalAmount, userIngredient.unitType, userIngredient.expiryDate);
};

export const getUserIngredients = async (userid: string): Promise<UserIngredient[]> => {

    const user = await userRepository.findUserById(userid);

    if (!user) {
        throw new createHttpError.NotFound('User not found');
    }

    return await userIngredientRepository.getUserIngredients(userid);
};

export const getUserIngredientById = async (id: string): Promise<UserIngredient | null> => {
    return await userIngredientRepository.getUserIngredientById(id);
};

export const getUserIngredientByIngredientId = async (userId: string, ingredientId: string): Promise<UserIngredient | null> => {
    return await userIngredientRepository.findUserIngredient(userId, ingredientId);
};

export const updateUserIngredient = async (
    id: string,
    updatedIngredient: UpdateUserIngredientDTO
): Promise<UserIngredient> => {
    const userIngredient = await userIngredientRepository.getUserIngredientById(id);

    if (!userIngredient) {
        throw new createHttpError.NotFound("User ingredient not found.");
    }

    if (updatedIngredient.unitQuantity !== undefined) {
        if (typeof updatedIngredient.unitQuantity !== "number" || updatedIngredient.unitQuantity < 0) {
            throw new createHttpError.BadRequest("Unit quantity must be a non-negative number.");
        }
    }

    if (updatedIngredient.totalAmount !== undefined) {
        if (updatedIngredient.totalAmount !== null && (typeof updatedIngredient.totalAmount !== "number" || updatedIngredient.totalAmount < 0)) {
            throw new createHttpError.BadRequest("Total amount must be a non-negative number or null.");
        }
    }

    if (updatedIngredient.unitType !== undefined) {
        if (typeof updatedIngredient.unitType !== "string" || updatedIngredient.unitType.length > 50) {
            throw new createHttpError.BadRequest("Unit type must be a string with a maximum length of 50 characters.");
        }
    }

    if (updatedIngredient.expiry_date !== undefined) {
        if (updatedIngredient.expiry_date !== null && isNaN(new Date(updatedIngredient.expiry_date).getTime())) {
            throw new createHttpError.BadRequest("Expiry date must be a valid date or null.");
        }
    }

    Object.assign(userIngredient, updatedIngredient);

    return await userIngredientRepository.updateUserIngredient(userIngredient);
};

export const deleteUserIngredient = async (id: string): Promise<void> => {
    const userIngredient = await userIngredientRepository.getUserIngredientById(id);

    if (!userIngredient) {
        throw new createHttpError.NotFound("User ingredient not found.");
    }

    await userIngredientRepository.deleteUserIngredient(id);
};

export default { addUserIngredient, getUserIngredients, getUserIngredientById, updateUserIngredient, deleteUserIngredient, getUserIngredientByIngredientId };
