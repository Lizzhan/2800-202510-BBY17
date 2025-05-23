import express from 'express';
import { GetAllIngredients } from '../controller/autosuggestsearchbar.js';
const router = express.Router();

/**
 * Route to fetch all ingredients from the database.
 * 
 * GET /getingredients
 * This route calls the GetAllIngredients controller to retrieve a list
 * of ingredients, usually for an autosuggest or search bar feature.
 */
router.get('/getingredients', GetAllIngredients);
export default router;
