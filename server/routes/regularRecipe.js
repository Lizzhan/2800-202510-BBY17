import express from 'express';
import { generateRegularRecipeName } from '../controller/regularRecipe.js';

const router = express.Router();

//localholse/api/regularRecipe
router.post('/', generateRegularRecipeName);
export default router;
