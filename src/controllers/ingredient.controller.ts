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

// Get all ingredients
export const getIngredients = asyncHandler(async (req: Request, res: Response) => {
  const result = await ingredientService.getIngredients();
  res.json(result);
});

// Get ingredient by ID
export const getIngredientById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ingredientService.getIngredientById(id);
  res.json(result);
});