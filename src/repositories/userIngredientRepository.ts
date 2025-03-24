import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UserIngredient } from "../entities/UserIngredient";
import { User } from "entities/User";
import { Ingredient } from "entities/Ingredient";

const userIngredientRepo: Repository<UserIngredient> = AppDataSource.getRepository(UserIngredient);

export const addUserIngredient = async (
    user: User,
    ingredient: Ingredient,
    unitQuantity: number,
    totalAmount: number,
    unitType: string,
    expiryDate?: Date
): Promise<UserIngredient> => {
    const newUserIngredient = userIngredientRepo.create({
        user,
        ingredient,
        unitQuantity: unitQuantity || 1,
        totalAmount: totalAmount || null,
        unitType: unitType || null,
        expiry_date: expiryDate || null,
    });
    
    return await userIngredientRepo.save(newUserIngredient);
};

export const findUserIngredient = async (userId: string, ingredientId: string): Promise<UserIngredient | null> => {
    return await userIngredientRepo.findOne({
        where: {
            user: { user_id: userId },
            ingredient: { Ing_id: ingredientId },
        },
        relations: ["ingredient"], // this includes the ingredient data in the result
    });
};

export const getUserIngredients = async (userid: string): Promise<UserIngredient[]> => {
    return await userIngredientRepo.find({
        where: {
            user: { user_id: userid },
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
            }
        }
    });
};

export const getUserIngredientById = async (id: string): Promise<UserIngredient | null> => {
    return await userIngredientRepo.findOne({
        where: {
            id: id,
        }
    });
};

export const updateUserIngredient = async (userIngredient : UserIngredient): Promise<UserIngredient> => {
    return await userIngredientRepo.save(userIngredient);
};

export const deleteUserIngredient = async (ids: string[]): Promise<void> => {
    await userIngredientRepo.delete(ids);
};

export default { addUserIngredient, findUserIngredient, getUserIngredients, updateUserIngredient, getUserIngredientById, deleteUserIngredient };
