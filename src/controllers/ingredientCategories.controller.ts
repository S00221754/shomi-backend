import { Request, Response } from "express";
import ingredientCategoriesService from "../services/ingredientCategories.service";
import asyncHandler from "../utils/asyncHandler";

export const getIngredientCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories =
      await ingredientCategoriesService.getIngredientCategories();
    res.json(categories);
  }
);
