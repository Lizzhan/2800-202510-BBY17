import db from '../db.js';

/**
 * Backend controller to match and return recipes that exactly use the user's provided ingredients.
 * It performs two steps:
 * 1. Converts ingredient names to their corresponding IDs.
 * 2. Finds recipes that only contain those ingredient IDs (no extras).
 *
 * help from chatgpt was used to finish part of the code
 *
 * @author Lucas Liu
 * @author https://chat.openai.com
 */
export const matchRecipes = (req, res) => {
  const { ingredients } = req.body;

  // Validate the input
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Ingredient list is required.' });
  }


  // Step 1: Convert ingredient names to IDs
  const placeholders = ingredients.map(() => '?').join(',');
  const ingredientIdQuery = `
    SELECT ingredient_id FROM recipedia.ingredients
    WHERE ingredient IN (${placeholders})
  `;

  //make the sql call to get the data
  db.query(ingredientIdQuery, ingredients, (err, rows) => {
    if (err) {
      console.error('❌ Failed to fetch ingredient IDs:', err);
      return res.status(500).json({ error: 'Failed to fetch ingredient IDs' });
    }

    const ids = rows.map(row => row.ingredient_id);

    // If no matching IDs found, return empty list
    if (ids.length === 0) return res.json([]);

    // Step 2: Find recipes that match all provided ingredient IDs exactly
    const idPlaceholders = ids.map(() => '?').join(',');
    const recipeMatchQuery = `
      SELECT r.* FROM recipedia.recipes r
      JOIN recipedia.recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      GROUP BY r.recipe_id
      HAVING COUNT(*) = COUNT(CASE WHEN ri.ingredient_id IN (${idPlaceholders}) THEN 1 END)
    `;

    //make the sql call to get the data
    db.query(recipeMatchQuery, ids, (err2, results) => {
      if (err2) {
        console.error('❌ Failed to fetch matching recipes:', err2);
        return res.status(500).json({ error: 'Failed to fetch matching recipes' });
      }

      res.json(results);
    });
  });
};
