import { Router } from "express";
import {
  bookmarkRecipe,
  unbookmarkRecipe,
  getBookmarksByUser,
  checkIfBookmarked,
} from "../controllers/bookmark-recipes.controller";

const router = Router();

router.post("/", bookmarkRecipe);
router.delete("/", unbookmarkRecipe);
router.get("/:userId", getBookmarksByUser);
router.get("/:userId/:recipeId", checkIfBookmarked);

export default router;
