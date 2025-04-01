import { Router } from "express";
import {
  createBookmark,
  deleteBookmark,
  getBookmarkedRecipesByUser,
  isRecipeBookmarked,
} from "../controllers/bookmark-recipes.controller";

const router = Router();

router.post("/", createBookmark);
router.delete("/", deleteBookmark);
router.get("/:userId", getBookmarkedRecipesByUser);
router.get("/:userId/:recipeId", isRecipeBookmarked);

export default router;
