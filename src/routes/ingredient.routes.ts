import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", ingredientController.getIngredients);
router.get("/:id", ingredientController.getIngredientById);
router.get("/barcode/:barcode", ingredientController.getIngredientByBarcode);

router.use(authMiddleware);

router.post("/", ingredientController.createIngredient);
router.put("/:id", ingredientController.editIngredient);
router.delete("/:id", ingredientController.deleteIngredient);

export default router;
