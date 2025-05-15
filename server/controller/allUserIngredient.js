import db from '../db.js';

export const getUserIngredients = (req, res) => {
  const userId = req.params.userId;

  const q = `
    SELECT i.ingredient
    FROM fridge f
    JOIN ingredients i ON f.ingredient_id = i.ingredient_id
    WHERE f.user_id = ?;
  `;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const names = data.map(row => row.ingredient);
    res.status(200).json(names);
  });
};
