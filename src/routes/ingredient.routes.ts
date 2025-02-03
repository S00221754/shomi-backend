import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";

const router = express.Router();

router.post("/", ingredientController.createIngredient);

router.get("/", ingredientController.getIngredients);

router.get("/:id", ingredientController.getIngredientById);

export default router;