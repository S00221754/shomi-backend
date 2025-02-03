import express from 'express';
import { createUserIngredient } from '../controllers/user-ingredient.controller';

const router = express.Router();

router.post('/', createUserIngredient);

export default router;