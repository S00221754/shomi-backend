import { UserIngredient } from "../entities/UserIngredient";
import userIngredientRepository from "../repositories/userIngredientRepository";
import ingredientRepository from '../repositories/ingredientRepository';
import userRepository from '../repositories/userRepository';
import createHttpError from 'http-errors';
import { UserIngredientInput } from "types/userIngredient";


export const addUserIngredient = async (userIngredient: UserIngredientInput): Promise<UserIngredient> => {

    console.log(userIngredient);
    
    const user = await userRepository.findUserById(userIngredient.userId);

    if (!user) {
        throw new createHttpError.NotFound('User not found');
    }

    const ingredient = await ingredientRepository.getIngredientById(userIngredient.ingredientId);

    if (!ingredient) {
        throw new createHttpError.NotFound('Ingredient not found');
    }

    const existingUserIngredient = await userIngredientRepository.findUserIngredient(user, ingredient);

    console.log(existingUserIngredient);
    
    if (existingUserIngredient) {
        throw new createHttpError.Conflict('User already has this ingredient');
    }

    return await userIngredientRepository.addUserIngredient(user, ingredient, userIngredient.unitQuantity, userIngredient.totalAmount, userIngredient.unitType, userIngredient.expiryDate);
};

export default { addUserIngredient };
