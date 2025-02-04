import express from 'express';
import { createUserIngredient, getUserIngredients, updateUserIngredient } from '../controllers/user-ingredient.controller';

const router = express.Router();

router.post('/', createUserIngredient);

router.get('/:id', getUserIngredients);

router.patch('/:id', updateUserIngredient);

export default router;