import express from "express";
import * as recipeController from "../controllers/recipe.controller";

const router = express.Router();

router.post("/", recipeController.addRecipe);

router.post("/:id", recipeController.findRecipeById);

router.get("/", recipeController.getRecipes);

router.get("/:id", recipeController.findRecipeById);

router.patch("/:id", recipeController.updateRecipe);

router.delete("/:id", recipeController.deleteRecipe);

router.post("/recommended/:userId", recipeController.getRecommendedRecipes);

router.post(
  "/:recipeId/deduction-preview",
  recipeController.getDeductionPreview
);

router.post("/:recipeId/cooked", recipeController.cookedRecipe);

export default router;
