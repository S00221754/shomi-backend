import AppDataSource from "../database/data-source";
import { BookmarkedRecipe } from "../entities/BookmarkedRecipes";

const repo = AppDataSource.getRepository(BookmarkedRecipe);

export const bookmarkRecipe = async (user_id: string, recipe_id: string) => {
  const bookmark = repo.create({ user_id, recipe_id });
  return await repo.save(bookmark);
};

export const unbookmarkRecipe = async (user_id: string, recipe_id: string) => {
  return await repo.delete({ user_id, recipe_id });
};

export const getBookmarksByUser = async (user_id: string) => {
  return await repo.find({
    where: { user_id },
    relations: ["recipe"],
    order: { created_at: "DESC" },
  });
};

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
