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

router.get('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;

  const recipeQuery = 'SELECT * FROM recipes WHERE recipe_id = ?';
  const ingredientsQuery = `
    SELECT i.ingredient AS ingredient_name
    FROM recipe_ingredients ri
    JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE ri.recipe_id = ?
  `;

  db.query(recipeQuery, [recipeId], (err, recipeData) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (recipeData.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    db.query(ingredientsQuery, [recipeId], (err, ingredientsData) => {
      if (err) {
        console.error('Error fetching ingredients:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const recipe = recipeData[0];
      recipe.ingredients = ingredientsData.map(row => row.ingredient_name); // turn into array of names

      res.json(recipe);
    });
  });
});

export default router;
