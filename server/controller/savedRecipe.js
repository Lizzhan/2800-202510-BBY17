// controller/savedRecipe.js

import db from '../db.js';




// Save a recipe for the logged-in user
export const saveRecipe = async (req, res) => {
  const { user_recipe_id } = req.body;  // <-- grab user_recipe_id from the request
  const recipeId = parseInt(user_recipe_id, 10); // <-- Parse to integer
  const userId = parseInt(req.session.userId, 10); // <-- Parse to integer

  console.log("Saving recipe... User ID:", userId, "Recipe ID:", recipeId);

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


// Unsave (remove) a recipe for the logged-in user
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


// Get all saved recipe IDs for the logged-in user
export const getSavedRecipes = (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const q = "SELECT user_recipe_id FROM `saved recipes` WHERE user_id = ?";

  db.query(q, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching saved recipes:", err);
      return res.status(500).json({ message: "Error fetching saved recipes" });
    }

    const savedRecipeIds = rows.map(row => row.user_recipe_id);
    res.status(200).json(savedRecipeIds);
  });
};
