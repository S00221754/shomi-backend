import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import bookmarkedRecipeService from "../services/bookmarkRecipes.service";
import { BookmarkedRecipe } from "entities/BookmarkedRecipes";

// Bookmark a recipe
export const bookmarkRecipe = asyncHandler(
  async (
    req: Request<{}, {}, { user_id: string; recipe_id: string }>,
    res: Response<BookmarkedRecipe>
  ) => {
    const { user_id, recipe_id } = req.body;
    const result = await bookmarkedRecipeService.bookmarkRecipe(
      user_id,
      recipe_id
    );
    res.status(201).json(result);
  }
);

// Unbookmark a recipe
export const unbookmarkRecipe = asyncHandler(
  async (
    req: Request<{}, {}, { user_id: string; recipe_id: string }>,
    res: Response<void>
  ) => {
    const { user_id, recipe_id } = req.body;
    await bookmarkedRecipeService.unbookmarkRecipe(user_id, recipe_id);
    res.status(204).end();
  }
);

// Get all bookmarked recipes for a user
export const getBookmarksByUser = asyncHandler(
  async (
    req: Request<{ userId: string }>,
    res: Response<BookmarkedRecipe[]>
  ) => {
    const { userId } = req.params;
    const result = await bookmarkedRecipeService.getBookmarksByUser(userId);
    res.json(result);
  }
);

// Check if a specific recipe is bookmarked
export const checkIfBookmarked = asyncHandler(
  async (
    req: Request<{ userId: string; recipeId: string }>,
    res: Response<{ bookmarked: boolean }>
  ) => {
    const { userId, recipeId } = req.params;
    const bookmarked = await bookmarkedRecipeService.isBookmarked(
      userId,
      recipeId
    );
    res.json({ bookmarked });
  }
);
