import AppDataSource from "../database/data-source";
import { BookmarkedRecipe } from "../entities/BookmarkedRecipes";

const repo = AppDataSource.getRepository(BookmarkedRecipe);

// bookmark a recipe
export const bookmarkRecipe = async (user_id: string, recipe_id: string) => {
  const bookmark = repo.create({ user_id, recipe_id });
  return await repo.save(bookmark);
};

// unbookmark a recipe
export const unbookmarkRecipe = async (user_id: string, recipe_id: string) => {
  return await repo.delete({ user_id, recipe_id });
};

// get all bookmarks for a user
export const getBookmarksByUser = async (user_id: string) => {
  return await repo.find({
    where: { user_id },
    relations: ["recipe"],
    order: { created_at: "DESC" },
  });
};

// check if a recipe is bookmarked by a user
export const isBookmarked = async (
  user_id: string,
  recipe_id: string
): Promise<boolean> => {
  const result = await repo.findOneBy({ user_id, recipe_id });
  return !!result;
};

export default {
  bookmarkRecipe,
  unbookmarkRecipe,
  getBookmarksByUser,
  isBookmarked,
};
