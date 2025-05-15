import express from 'express';
import { getFridgeIngredients } from '../controller/getFridge.js';

const router = express.Router();

router.get('/:userId', getFridgeIngredients);

export default router;
