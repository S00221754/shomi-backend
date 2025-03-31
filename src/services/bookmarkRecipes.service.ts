import bookmarkedRecipeRepository from "../repositories/bookmarkedRecipesRepository";
import recipeRepository from "../repositories/recipeRepository";
import profileRepository from "../repositories/profileRepository";
import createHttpError from "http-errors";

// Bookmark a recipe
const bookmarkRecipe = async (user_id: string, recipe_id: string) => {
  const user = await profileRepository.findProfileById(user_id);
  const recipe = await recipeRepository.findRecipeById(recipe_id);

  if (!user || !recipe) {
    throw new createHttpError.NotFound("User or recipe not found.");
  }

  const alreadyBookmarked = await bookmarkedRecipeRepository.isBookmarked(
    user_id,
    recipe_id
  );
  if (alreadyBookmarked) {
    throw new createHttpError.Conflict("Recipe already bookmarked.");
  }

  return await bookmarkedRecipeRepository.bookmarkRecipe(user_id, recipe_id);
};

// Remove a bookmark
const unbookmarkRecipe = async (user_id: string, recipe_id: string) => {
  const result = await bookmarkedRecipeRepository.unbookmarkRecipe(
    user_id,
    recipe_id
  );

  if (!result.affected) {
    throw new createHttpError.NotFound("Bookmark not found.");
  }

  return result;
};

// Get all bookmarks by user
const getBookmarksByUser = async (user_id: string) => {
  const user = await profileRepository.findProfileById(user_id);

  if (!user) {
    throw new createHttpError.NotFound("User not found.");
  }

  return await bookmarkedRecipeRepository.getBookmarksByUser(user_id);
};

// Check if a recipe is bookmarked
const isBookmarked = async (
  user_id: string,
  recipe_id: string
): Promise<boolean> => {
  return await bookmarkedRecipeRepository.isBookmarked(user_id, recipe_id);
};

export default {
  bookmarkRecipe,
  unbookmarkRecipe,
  getBookmarksByUser,
  isBookmarked,
};
