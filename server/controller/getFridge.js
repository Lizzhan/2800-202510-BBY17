import db from '../db.js';

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
    res.status(200).json(data); // returns array of objects with ingredient + in_pantry
  });
};
