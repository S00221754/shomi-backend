import express from "express";
import * as ingredientController from "../controllers/ingredient.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/ingredient:
 *   post:
 *     summary: Create a new ingredient
 *     tags:
 *       - Ingredient
 *     requestBody:
 *       description: Ingredient details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientInput'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
router.post("/", ingredientController.createIngredient);

export default router;