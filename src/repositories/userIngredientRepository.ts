import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UserIngredient } from "../entities/UserIngredient";
import { User } from "entities/User";
import { Ingredient } from "entities/Ingredient";


const userIngredientRepo: Repository<UserIngredient> = AppDataSource.getRepository(UserIngredient);

export const addUserIngredient = async (
    user: User,
    ingredient: Ingredient,
    quantity: number,
    expiryDate?: Date
): Promise<UserIngredient> => {
    const newUserIngredient = userIngredientRepo.create({
        user,
        ingredient,
        quantity: quantity || 1,
        expiry_date: expiryDate || null,
    });

    return await userIngredientRepo.save(newUserIngredient);
};

export const findUserIngredient = async (user: User, ingredient: Ingredient): Promise<UserIngredient | null> => {
    return await userIngredientRepo.findOne({
        where: {
            user: { user_id: user.user_id },
            ingredient: { Ing_id: ingredient.Ing_id },
        }
    });
};


export default { addUserIngredient, findUserIngredient };
