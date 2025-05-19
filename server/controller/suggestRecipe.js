import db from '../db.js';

export const matchRecipes = (req, res) => {
  console.log('🧪 Received ingredients:', req.body);
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredient list is required.' });
  }

  console.log('✅ Parsed ingredients:', ingredients);

  const placeholders = ingredients.map(() => '?').join(',');
  const ingredientIdQuery = `
    SELECT ingredient_id FROM recipedia.ingredients
    WHERE ingredient IN (${placeholders})
  `;

  db.query(ingredientIdQuery, ingredients, (err, rows) => {
    if (err) {
      console.error('❌ Failed to fetch ingredient IDs:', err);
      return res.status(500).json({ error: 'Failed to fetch ingredient IDs' });
    }

    const ids = rows.map(row => row.ingredient_id);
    console.log('🔎 Matching ingredient IDs:', ids);

    if (ids.length === 0) return res.json([]);

    const idPlaceholders = ids.map(() => '?').join(',');
    const recipeMatchQuery = `
      SELECT r.* FROM recipedia.recipes r
      JOIN recipedia.recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      GROUP BY r.recipe_id
      HAVING COUNT(*) = COUNT(CASE WHEN ri.ingredient_id IN (${idPlaceholders}) THEN 1 END)
    `;

    db.query(recipeMatchQuery, ids, (err2, results) => {
      if (err2) {
        console.error('❌ Failed to fetch matching recipes:', err2);
        return res.status(500).json({ error: 'Failed to fetch matching recipes' });
      }

      console.log('📦 Matched recipes:', results);
      res.json(results);
    });
  });
};
