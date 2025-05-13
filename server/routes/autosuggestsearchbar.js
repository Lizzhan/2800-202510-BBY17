import express from 'express';
import { GetAllIngredients } from '../controller/autosuggestsearchbar.js';
const router = express.Router();

router.get('/getingredients', GetAllIngredients);
export default router;
