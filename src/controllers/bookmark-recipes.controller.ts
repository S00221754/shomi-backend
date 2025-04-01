import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import bookmarkRecipesService from "../services/bookmarkRecipes.service";

// Bookmark a recipe
export const createBookmark = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, recipeId } = req.body.data;
    const result = await bookmarkRecipesService.bookmarkRecipe(
      userId,
      recipeId
    );
    res.json(result);
  }
);

// Unbookmark a recipe
export const deleteBookmark = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, recipeId } = req.body;
    const result = await bookmarkRecipesService.unbookmarkRecipe(
      userId,
      recipeId
    );
    res.json(result);
  }
);

// Get all bookmarked recipes for a user
export const getBookmarkedRecipesByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await bookmarkRecipesService.getBookmarksByUser(userId);
    res.json(result);
  }
);

// Check if a recipe is bookmarked by a user
export const isRecipeBookmarked = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, recipeId } = req.params;
    const bookmarked = await bookmarkRecipesService.isBookmarked(
      userId,
      recipeId
    );
    res.json({ bookmarked });
  }
);
