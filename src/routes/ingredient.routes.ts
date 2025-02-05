import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", ingredientController.createIngredient);

router.get("/",  ingredientController.getIngredients);

router.get("/:id", ingredientController.getIngredientById);

router.put("/:id", ingredientController.editIngredient);

router.delete("/:id", ingredientController.deleteIngredient);

router.get("/barcode/:barcode", ingredientController.getIngredientByBarcode);

export default router;