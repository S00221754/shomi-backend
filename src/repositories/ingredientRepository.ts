import { IngredientInput } from "../types/ingredient";
import { Ingredient } from "../entities/Ingredient";
import AppDataSource from "../database/data-source";
import { Repository } from "typeorm";

const ingredientRepo: Repository<Ingredient> = AppDataSource.getRepository(Ingredient);

// Get all ingredients
export const getIngredients = async (): Promise<Ingredient[]> => {
    return await ingredientRepo.find()
};

// Get ingredient by ID
export const getIngredientById = async (id: string): Promise<Ingredient | null> => {
    return await ingredientRepo.findOne({where: {Ing_id: id}});
};

// Create ingredient
export const addIngredient = async (ingredient: IngredientInput): Promise<Ingredient> => {
    const newIngredient = ingredientRepo.create(ingredient);
    return await ingredientRepo.save(newIngredient);
};

// Edit ingredient
export const editIngredient = async (id: string, editedIngredient: IngredientInput): Promise<boolean> => {
    const result = await ingredientRepo.update(id, editedIngredient);
    return result.affected !== 0;
};

// Delete ingredient
export const deleteIngredient = async (id: string): Promise<boolean> => {
    const result = await ingredientRepo.delete(id);
    return result.affected !== 0;
};

// may need to be refactored or a whole new function created for handling search
export const findIngredientByName = async (name: string): Promise<Ingredient | null> => {
    return await ingredientRepo.findOne({ where: { Ing_name: name } });
};

export const findIngredientByBarcode = async (barcode: string): Promise<Ingredient | null> => {
    return await ingredientRepo.findOne({ where: { Ing_barcode: barcode } });
};

// needs further testing
export const ingredientExists = async (name: string, brand?: string, barcode?: string): Promise<boolean> => {
    const count = await ingredientRepo.count({
        where: [
            { Ing_barcode: name, Ing_name: brand },
            { Ing_barcode: barcode }
        ]
    });

    return count > 0;
};

export const getDistinctUnitTypes = async (): Promise<string[]> => {
    const result = await ingredientRepo
        .createQueryBuilder("ingredient")
        .select("ingredient.Ing_quantity_units", "unitType")
        .distinct(true)
        .getRawMany();

    return result.map((item) => item.unitType);
};

export default { getIngredients, getIngredientById, editIngredient, addIngredient, deleteIngredient, findIngredientByName, findIngredientByBarcode, ingredientExists, getDistinctUnitTypes };