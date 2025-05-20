import express from 'express';
import { matchRecipes } from '../controller/suggestRecipe.js';

const router = express.Router();

router.post('/match', matchRecipes);

export default router;
