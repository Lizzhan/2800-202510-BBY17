import db from '../db.js';

export const matchRecipes = (req, res) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredient list is required.' });
  }

  // Get matching ingredient_ids for given names
  const placeholders = ingredients.map(() => '?').join(',');
  const ingredientIdQuery = `
    SELECT ingredient_id FROM recipedia.ingredients
    WHERE ingredient IN (${placeholders})
  `;

  db.query(ingredientIdQuery, ingredients, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch ingredient IDs' });

    const ids = rows.map(row => row.ingredient_id);
    if (ids.length === 0) return res.json([]);

    const idPlaceholders = ids.map(() => '?').join(',');
    const recipeMatchQuery = `
      SELECT r.* FROM recipedia.recipes r
      JOIN recipedia.recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      GROUP BY r.recipe_id
      HAVING COUNT(*) = SUM(ri.ingredient_id IN (${idPlaceholders}))
    `;

    db.query(recipeMatchQuery, ids, (err2, results) => {
      if (err2) return res.status(500).json({ error: 'Failed to fetch matching recipes' });
      res.json(results);
    });
  });
};
