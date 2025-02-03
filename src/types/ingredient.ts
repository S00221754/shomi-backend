import { Ingredient } from "entities/Ingredient";

export type IngredientInput = Partial<Omit<Ingredient, "id">>;