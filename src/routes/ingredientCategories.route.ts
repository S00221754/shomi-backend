// src/routes/ingredientCategory.routes.ts
import { Router } from "express";
import { getIngredientCategories } from "../controllers/ingredientCategories.controller";

const router = Router();

router.get("/", getIngredientCategories);

export default router;
