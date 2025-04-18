import { Request, Response } from "express";
import recipeService from "../services/recipe.service";
import asyncHandler from "../utils/asyncHandler";
import { CreateRecipeDTO, UpdateRecipeDTO } from "../types/recipe";
import { Recipe } from "../entities/Recipe";
import recommendRecipeService from "../services/recipeRecommend.service";
import { AuthenticatedRequest } from "middleware/authMiddleware";
import { PaginatedResponse } from "types/response";

export const addRecipe = asyncHandler(
  async (req: Request<{}, {}, CreateRecipeDTO>, res: Response<Recipe>) => {
    const recipeData = req.body;
    const result = await recipeService.addRecipe(recipeData);
    res.status(201).json(result);
  }
);

export const getRecipes = asyncHandler(
  async (req: Request, res: Response<PaginatedResponse<Recipe>>) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { data, total } = await recipeService.getRecipes(page, limit);

    res.json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
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
  async (req: AuthenticatedRequest, res: Response<Recipe[]>) => {
    const userId = req.user?.sub;
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
  async (req: AuthenticatedRequest, res: Response) => {
    const { recipeId } = req.params;
    const userId = req.user?.sub;

    const result = await recipeService.getRecipeDeductionPreview(
      userId,
      recipeId
    );
    res.json(result);
  }
);

export const cookedRecipe = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { recipeId } = req.params;
    const { deductions } = req.body;
    const userId = req.user?.sub;

    const result = await recipeService.cookedRecipe(userId, deductions);
    res.json(result);
  }
);
