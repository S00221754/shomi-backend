import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";

const router = express.Router();

router.post("/", ingredientController.createIngredient);

router.get("/", ingredientController.getIngredients);

router.get("/:id", ingredientController.getIngredientById);

router.put("/:id", ingredientController.editIngredient);

router.delete("/:id", ingredientController.deleteIngredient);

export default router;