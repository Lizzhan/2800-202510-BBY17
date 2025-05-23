import db from '../db.js';

/**
 * Middleware to check if a recipe is already saved by the current user.
 * 
 * - Extracts `user_recipe_id` from the request body and `userId` from the session
 * - If the user is not logged in, returns a 401 Unauthorized error
 * - Queries the `saved_recipes` table to see if this recipe is already saved by this user
 * - If a match is found, returns 409 Conflict to indicate it's already saved
 * - If no match is found, proceeds to the next middleware or controller
 * 
 * Useful in POST routes that add recipes to the user's saved list, to prevent duplicates.
 * 
 * @author Kaid Krawchuk
 * @author https://chat.openai.com
 */
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
      // Valid recipe, continue
      next();
    }
  });
};
