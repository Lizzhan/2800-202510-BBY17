import db from '../db.js';

/**
 * Backend controller to fetch all ingredients from a user's fridge.
 * This is primarily used to supply ingredient data for AI-generated recipes.
 *
 * @param {Object} req - Express request object, expects `userId` as a URL parameter.
 * @param {Object} res - Express response object, used to return ingredient names as JSON.
 *
 * @author Lucas Liu
 */
export const getUserIngredients = (req, res) => {
  // Extract user ID from request parameters
  const userId = req.params.userId;

  // SQL query to join fridge and ingredients tables and get ingredient names for the user
  const q = `
    SELECT i.ingredient
    FROM fridge f
    JOIN ingredients i ON f.ingredient_id = i.ingredient_id
    WHERE f.user_id = ?;
  `;

  // Execute the query and return results as a list of ingredient names
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err); // Return error if query fails

    const names = data.map(row => row.ingredient); // Extract ingredient names
    res.status(200).json(names); // Send the list as JSON response
  });
};
