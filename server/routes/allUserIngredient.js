import express from 'express';
import { getUserIngredients } from '../controller/allUserIngredient.js';

const router = express.Router();

//localhost:3000/api/allingredients/:userId
router.get('/:userId', getUserIngredients);

export default router;