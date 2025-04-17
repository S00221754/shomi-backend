import { Router } from "express";
import {
  createBookmark,
  deleteBookmark,
  getBookmarkedRecipesByUser,
  isRecipeBookmarked,
} from "../controllers/bookmark-recipes.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createBookmark);
router.delete("/", deleteBookmark);
router.get("/", getBookmarkedRecipesByUser);
router.get("/:recipeId", isRecipeBookmarked);

export default router;
