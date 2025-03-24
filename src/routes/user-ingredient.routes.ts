import express from 'express';
import { createUserIngredient, getUserIngredients, updateUserIngredient, deleteUserIngredient, getUserIngredientByIngredientId } from '../controllers/user-ingredient.controller';

const router = express.Router();

router.post('/', createUserIngredient);

router.get('/:id', getUserIngredients);

router.patch('/:id', updateUserIngredient);

router.delete('/', deleteUserIngredient);

router.get('/:userId/:ingredientId', getUserIngredientByIngredientId);

export default router;