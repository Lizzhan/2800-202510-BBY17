// routes/funnyRecipe.js
import express from 'express';
import { generateFunnyRecipeName } from '../controller/funnyRecipe.js';

const router = express.Router();
router.post('/', generateFunnyRecipeName);
export default router;
