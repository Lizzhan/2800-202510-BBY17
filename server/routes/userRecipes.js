import express from 'express';
import { getUserRecipes, deleteUserRecipe } from '../controller/userRecipes.js';

const router = express.Router();

// GET /api/user-recipes
router.get('/', getUserRecipes);

// DELETE /api/user-recipes/:id
router.delete('/:id', deleteUserRecipe);

export default router;