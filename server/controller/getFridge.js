import db from '../db.js';

// GET all fridge/pantry items for a user
export const getFridgeIngredients = (req, res) => {
  const userId = req.params.userId;

  const q = `
    SELECT i.ingredient, f.in_pantry
    FROM fridge f
    JOIN ingredients i ON f.ingredient_id = i.ingredient_id
    WHERE f.user_id = ?;
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data); // [{ ingredient: 'milk', in_pantry: 1 }, ...]
  });
};

// POST: Add ingredient by name
export const addIngredient = (req, res) => {
  const { user_id, ingredient, in_pantry } = req.body;

  const lookupSql = 'SELECT ingredient_id FROM ingredients WHERE ingredient = ?';
  db.query(lookupSql, [ingredient], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    const ingredient_id = rows[0].ingredient_id;

    const insertSql = 'INSERT INTO fridge (user_id, ingredient_id, in_pantry) VALUES (?, ?, ?)';
    db.query(insertSql, [user_id, ingredient_id, in_pantry], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Failed to add ingredient' });
      res.json({ success: true, insertedId: result.insertId });
    });
  });
};

// POST: Remove ingredient by name
export const removeIngredient = (req, res) => {
  const { user_id, ingredient, in_pantry } = req.body;

  const lookupSql = 'SELECT ingredient_id FROM ingredients WHERE ingredient = ?';
  db.query(lookupSql, [ingredient], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    const ingredient_id = rows[0].ingredient_id;

    const deleteSql = 'DELETE FROM fridge WHERE user_id = ? AND ingredient_id = ? AND in_pantry = ?';
    db.query(deleteSql, [user_id, ingredient_id, in_pantry], (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Failed to remove ingredient' });
      res.json({ success: true });
    });
  });
};
