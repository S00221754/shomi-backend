import { Request, Response } from "express";
import ingredientService from "../services/ingredient.service";
import asyncHandler from "../utils/asyncHandler";
import { IngredientInput } from "types/ingredient";

// Create a new ingredient
export const createIngredient = asyncHandler(async (req: Request, res: Response) => {
  const ingredientInput: IngredientInput = req.body;
  const result = await ingredientService.createIngredient(ingredientInput);
  res.json(result);
});