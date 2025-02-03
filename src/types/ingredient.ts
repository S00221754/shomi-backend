export interface Ingredient {
    id: number;
    ING_Name: string;
    ING_BrandName?: string;
    ING_KeyWords?: string[];
    ING_Units?: string[];
    ING_Barcode?: string;
}

export interface IngredientInput {
    ING_Name: string;
    ING_BrandName?: string;
    ING_KeyWords?: string[];
    ING_Units?: string[];
    ING_Barcode?: string;
}