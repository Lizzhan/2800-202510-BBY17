import express from 'express';
import { queryAsync } from '../db.js';

const router = express.Router();

router.get('/recipes', async (req, res) => {
  try {
    const rows = await queryAsync('SELECT * FROM recipes ORDER BY recipe_id DESC;');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const rows = await queryAsync('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
