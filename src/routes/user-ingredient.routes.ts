import express from 'express';
import { createUserIngredient, getUserIngredients, updateUserIngredient, deleteUserIngredient } from '../controllers/user-ingredient.controller';

const router = express.Router();

router.post('/', createUserIngredient);

router.get('/:id', getUserIngredients);

router.patch('/:id', updateUserIngredient);

router.delete('/:id', deleteUserIngredient);

export default router;