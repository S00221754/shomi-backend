import express from "express";
import * as recipeController from "../controllers/recipe.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.findRecipeById);

router.use(authMiddleware);

router.post("/", recipeController.addRecipe);
router.patch("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

router.post("/recommended", recipeController.getRecommendedRecipes);

router.post(
  "/:recipeId/deduction-preview",
  recipeController.getDeductionPreview
);
router.post("/:recipeId/cooked", recipeController.cookedRecipe);

export default router;
