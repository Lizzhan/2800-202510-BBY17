import express from 'express';
import {
  getFridgeIngredients,
  addIngredient,
  removeIngredient
} from '../controller/getFridge.js';

const router = express.Router();

// GET all ingredients for a user
router.get('/:userId', getFridgeIngredients);

// POST to add a new ingredient
router.post('/add', addIngredient);

// POST to remove an ingredient
router.post('/remove', removeIngredient);

export default router;
