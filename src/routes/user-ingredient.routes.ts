import express from "express";
import {
  createUserIngredient,
  getUserIngredients,
  updateUserIngredient,
  deleteUserIngredient,
  getUserIngredientByIngredientId,
  quickRestockUserIngredient,
  getPaginatedUserIngredients,
} from "../controllers/user-ingredient.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createUserIngredient);
router.get("/", getUserIngredients);
router.get("/paginated", getPaginatedUserIngredients);
router.patch("/:id", updateUserIngredient);
router.delete("/", deleteUserIngredient);
router.get("/ingredient/:ingredientId", getUserIngredientByIngredientId);
router.patch("/:id/quick-restock", quickRestockUserIngredient);

export default router;
