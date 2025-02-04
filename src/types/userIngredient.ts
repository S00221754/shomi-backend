export type UserIngredientInput = {
    userId: string;
    ingredientId: string; 
    unitQuantity?: number;
    totalAmount?: number;
    unitType?: string;
    expiryDate?: Date;
};
