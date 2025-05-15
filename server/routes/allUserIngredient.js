import express from 'express';
import { getUserIngredients } from '../controller/allUserIngredient.js';

const router = express.Router();

router.get('/:userId', getUserIngredients);

export default router; 
