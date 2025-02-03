import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";

const router = express.Router();

router.post("/", ingredientController.createIngredient);

export default router;