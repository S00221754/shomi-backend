export type UserIngredientInput = {
    userId: string;
    ingredientId: string; 
    unitQuantity?: number;
    totalAmount?: number;
    unitType?: string;
    expiry_date?: Date;
};

export interface UpdateUserIngredientDTO {
    unitQuantity?: number;
    totalAmount?: number | null;
    unitType?: string;
    expiry_date?: string | null;
}

