// controller/savedRecipe.js
import db from '../db.js';




/**
 * Save a recipe for the logged-in user
 * @route POST /api/saved
 * @body { number } user_recipe_id - The ID of the recipe to save
 * @returns { message: string }
 */
export const saveRecipe = async (req, res) => {
  const { user_recipe_id } = req.body;  // <-- grab user_recipe_id from the request
  const recipeId = parseInt(user_recipe_id, 10); // <-- Parse to integer
  const userId = parseInt(req.session.userId, 10); // <-- Parse to integer

  // console.log("Saving recipe... User ID:", userId, "Recipe ID:", recipeId);

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    await db.query(
      "INSERT IGNORE INTO `saved_recipes` (user_id, recipe_id) VALUES (?, ?)",
      [userId, recipeId]
    );
    res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Error saving recipe" });
  }
};


/**
 * Unsave (remove) a recipe for the logged-in user
 * @route DELETE /api/saved
 * @body { number } user_recipe_id - The ID of the recipe to unsave
 * @returns { message: string }
 */
export const unsaveRecipe = async (req, res) => {
  const { user_recipe_id } = req.body;
  const recipeId = parseInt(user_recipe_id, 10); // <-- Parse to integer
  const userId = parseInt(req.session.userId, 10); // <-- Parse to integer


  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    await db.query(
      "DELETE FROM `saved_recipes` WHERE user_id = ? AND recipe_id = ?",
      [userId, recipeId]
    );
    res.status(200).json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving recipe:", error);
    res.status(500).json({ message: "Error unsaving recipe" });
  }
};


/**
 * Get all saved recipes for the logged-in user
 * @route GET /api/saved
 * @returns {Array} List of saved recipe objects
 */
export const getSavedRecipes = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT r.recipe_id, r.recipe_title, r.description
        FROM saved_recipes s
        JOIN recipes r ON s.recipe_id = r.recipe_id
        WHERE s.user_id = ?
        `,
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
};
