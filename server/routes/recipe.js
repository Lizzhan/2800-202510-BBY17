import express from 'express';
import db from '../db.js'; // ✅ Import your db like usual

const router = express.Router();

router.get('/recipes', (req, res) => {
  try {
    const q = 'SELECT * FROM recipes ORDER BY recipe_id DESC'
    db.query(q, (err, data)=>{
        if(err) return err;
        console.log(data)
        res.json(data)
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);
    const rows = result[0];  // ✅ Again, manually grab rows
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
