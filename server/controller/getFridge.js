import db from '../db.js';

/**
 * GET: Fetch all fridge and pantry ingredients for a specific user.
 * Joins the fridge table with the ingredients table and returns ingredient names
 * along with a flag indicating whether the item is in the pantry or fridge.
 *
 * @author Lucas Liu
 */
export const getFridgeIngredients = (req, res) => {
  const userId = req.params.userId;

  //build the sql query
  const q = `
    SELECT i.ingredient, f.in_pantry
    FROM fridge f
    JOIN ingredients i ON f.ingredient_id = i.ingredient_id
    WHERE f.user_id = ?;
  `;

  //make the mysql call to get the data
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data); // Example: [{ ingredient: 'milk', in_pantry: 1 }, ...]
  });
};

/**
 * POST: Add a new ingredient (by name) to the user's fridge or pantry.
 * Looks up the ingredient ID from the ingredients table before inserting into fridge.
 *
 * ChatGPT(gpt4) was used to complete part of this code
 * 
 * @author Lucas Liu
 */
export const addIngredient = (req, res) => {
  const { user_id, ingredient, in_pantry } = req.body;

  // Look up the ingredient ID from the ingredients table
  const lookupSql = 'SELECT ingredient_id FROM ingredients WHERE ingredient = ?';
  db.query(lookupSql, [ingredient], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    const ingredient_id = rows[0].ingredient_id;

    // Insert the ingredient into the fridge table
    const insertSql = 'INSERT INTO fridge (user_id, ingredient_id, in_pantry) VALUES (?, ?, ?)';
    db.query(insertSql, [user_id, ingredient_id, in_pantry], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Failed to add ingredient' });
      res.json({ success: true, insertedId: result.insertId });
    });
  });
};

/**
 * POST: Remove an ingredient (by name) from the user's fridge or pantry.
 * Looks up the ingredient ID from the ingredients table before deleting from fridge.
 *
 * ChatGPT(gpt4) was used to complete part of this code
 * 
 * @author Lucas Liu
 */
export const removeIngredient = (req, res) => {
  const { user_id, ingredient, in_pantry } = req.body;

  // Look up the ingredient ID from the ingredients table
  const lookupSql = 'SELECT ingredient_id FROM ingredients WHERE ingredient = ?';
  db.query(lookupSql, [ingredient], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    const ingredient_id = rows[0].ingredient_id;

    // Delete the ingredient from the fridge table
    const deleteSql = 'DELETE FROM fridge WHERE user_id = ? AND ingredient_id = ? AND in_pantry = ?';
    db.query(deleteSql, [user_id, ingredient_id, in_pantry], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Failed to remove ingredient' });
      res.json({ success: true });
    });
  });
};
