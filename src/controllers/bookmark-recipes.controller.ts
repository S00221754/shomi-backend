import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import bookmarkRecipesService from "../services/bookmarkRecipes.service";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Bookmark a recipe
export const createBookmark = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const { recipeId } = req.body;

    const result = await bookmarkRecipesService.bookmarkRecipe(
      userId,
      recipeId
    );
    res.json(result);
  }
);

// Unbookmark a recipe
export const deleteBookmark = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const { recipeId } = req.body;

    const result = await bookmarkRecipesService.unbookmarkRecipe(
      userId,
      recipeId
    );
    res.json(result);
  }
);

// Get all bookmarked recipes for a user
export const getBookmarkedRecipesByUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;

    const result = await bookmarkRecipesService.getBookmarksByUser(userId);
    res.json(result);
  }
);

// Check if a recipe is bookmarked by the user
export const isRecipeBookmarked = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.sub;
    const { recipeId } = req.params;

    const bookmarked = await bookmarkRecipesService.isBookmarked(
      userId,
      recipeId
    );
    res.json({ bookmarked });
  }
);
