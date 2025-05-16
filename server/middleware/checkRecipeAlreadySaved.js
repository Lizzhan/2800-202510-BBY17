
import db from '../db.js';

export const checkRecipeAlreadySaved = (req, res, next) => {
  const { user_recipe_id } = req.body;
  const recipeId = parseInt(user_recipe_id);
  const userId = parseInt(req.session.userId);

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const q = "SELECT * FROM saved_recipes WHERE user_id = ? AND recipe_id = ?";

  db.query(q, [userId, recipeId], (err, results) => {
    if (err) {
      console.error("Error checking saved recipes:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      // Already saved
      return res.status(409).json({ message: "Recipe already saved!" });
    } else {
      // Not saved yet, continue to controller
      next();
    }
  });
};