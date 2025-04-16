import { Request, Response } from "express";
import recipeService from "../services/recipe.service";
import asyncHandler from "../utils/asyncHandler";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../types/recipe";
import { Recipe } from "../entities/Recipe";
import recommendRecipeService from "../services/recipeRecommend.service";

export const addRecipe = asyncHandler(
  async (req: Request<{}, {}, CreateRecipeDTO>, res: Response<Recipe>) => {
    const recipeData = req.body;
    const result = await recipeService.addRecipe(recipeData);
    res.status(201).json(result);
  }
);

export const getRecipes = asyncHandler(
  async (req: Request, res: Response<Recipe[]>) => {
    const result = await recipeService.getRecipes();
    res.json(result);
  }
);

export const findRecipeById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response<Recipe>) => {
    const { id } = req.params;
    const result = await recipeService.findRecipeById(id);
    res.json(result);
  }
);

export const updateRecipe = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UpdateRecipeDTO>,
    res: Response<Recipe>
  ) => {
    const { id } = req.params;
    const updatedRecipe = req.body;
    const result = await recipeService.updateRecipe(id, updatedRecipe);
    res.json(result);
  }
);

export const deleteRecipe = asyncHandler(
  async (req: Request<{ id: string }>, res: Response<void>) => {
    const { id } = req.params;
    await recipeService.deleteRecipe(id);
    res.status(204).end();
  }
);

export const getRecommendedRecipes = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, { selectedIngredients?: string[] }>,
    res: Response<Recipe[]>
  ) => {
    const { userId } = req.params;
    let { selectedIngredients } = req.body;

    if (
      !Array.isArray(selectedIngredients) ||
      selectedIngredients.length === 0 ||
      selectedIngredients.includes("")
    ) {
      selectedIngredients = [];
    }

    const result = await recommendRecipeService.getRecommendedRecipes(
      userId,
      selectedIngredients
    );
    res.json(result);
  }
);

export const getDeductionPreview = asyncHandler(
  async (req: Request, res: Response) => {
    const { recipeId } = req.params;
    const { user_id } = req.body;

    const result = await recipeService.getRecipeDeductionPreview(
      user_id,
      recipeId
    );

    res.json(result);
  }
);

export const cookedRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    const { recipeId } = req.params;
    const { user_id, deductions } = req.body;

    const result = await recipeService.cookedRecipe(user_id, deductions);

    res.json(result);
  }
);
