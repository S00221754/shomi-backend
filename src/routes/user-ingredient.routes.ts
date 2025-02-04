import express from 'express';
import { createUserIngredient, getUserIngredients } from '../controllers/user-ingredient.controller';

const router = express.Router();

router.post('/', createUserIngredient);

router.get('/:id', getUserIngredients);



export default router;