import pool from "../config/db";
import { Ingredient, IngredientInput } from "../types/ingredient";

// Get all ingredients
export const getIngredients = async (): Promise<Ingredient[]> => {
    const query = `SELECT * FROM public."tbl_Ingredients";`;
    const { rows } = await pool.query(query);

    return rows;
};

// Get ingredient by ID
export const getIngredientById = async (id: string): Promise<Ingredient> => {
    const query = `SELECT * FROM public."tbl_Ingredients" WHERE "id" = $1;`;
    const { rows } = await pool.query(query, [id]);

    return rows[0];
};

// Create ingredient
export const addIngredient = async (ingredient: IngredientInput): Promise<Ingredient> => {
    const query = `
        INSERT INTO public."tbl_Ingredients" ("ING_Name", "ING_BrandName", "ING_KeyWords", "ING_Units", "ING_Barcode")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        ingredient.ING_Name,
        ingredient.ING_BrandName || null,
        ingredient.ING_KeyWords || null,
        ingredient.ING_Units || null,
        ingredient.ING_Barcode || null
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Edit ingredient
export const editIngredient = async (id:string, editedIngredient: IngredientInput): Promise<Boolean> => {
    const query = `
        UPDATE public."tbl_Ingredients"
        SET "ING_Name" = $1, "ING_BrandName" = $2, "ING_KeyWords" = $3, "ING_Units" = $4, "ING_Barcode" = $5
        WHERE "id" = $6
        RETURNING *;
    `;

    const values = [
        editedIngredient.ING_Name,
        editedIngredient.ING_BrandName || null,
        editedIngredient.ING_KeyWords || null,
        editedIngredient.ING_Units || null,
        editedIngredient.ING_Barcode || null,
        id
    ];

    const { rows } = await pool.query(query, [values]);

    if (rows.length === 0) {
        return false;
    }

    return true;
};


// Delete ingredient
export const deleteIngredient = async (id: string): Promise<boolean> => {
    const query = `DELETE FROM public."tbl_Ingredients" WHERE "id" = $1;`;
    const { rowCount } = await pool.query(query, [id]);

    if (rowCount === 0) {
        return false;
    }

    return true;
};

// may need to be refactored or a whole new function created for handling search
export const findIngredientByName = async (name: string): Promise<Ingredient> => {
    const query = `
        SELECT * FROM public."tbl_Ingredients" WHERE "ING_Name" = $1;
    `;

    const { rows } = await pool.query(query, [name]);
    return rows[0];
};

export const findIngredientByBarcode = async (barcode: string): Promise<Ingredient> => {
    const query = `
        SELECT * FROM public."tbl_Ingredients" WHERE "ING_Barcode" = $1;
    `;

    const { rows } = await pool.query(query, [barcode]);
    return rows[0];
};

// needs further testing
export const ingredientExists = async (name: string, brand?: string, barcode?: string): Promise<boolean> => {
    const query = `
        SELECT 1 FROM public."tbl_Ingredients"
        WHERE ("ING_Name" = $1 AND ($2::VARCHAR IS NULL OR "ING_BrandName" = $2))
        OR ($3::VARCHAR IS NOT NULL AND "ING_Barcode" = $3)
        LIMIT 1;
    `;

    const { rows } = await pool.query(query, [name, brand || null, barcode || null]);
    return rows.length > 0;
};

export default { getIngredients, getIngredientById, editIngredient, addIngredient, deleteIngredient, findIngredientByName, findIngredientByBarcode, ingredientExists };