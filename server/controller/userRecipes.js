import db from '../db.js';

/**
 * Get all recipes uploaded by the current user
 * 
 * Route: GET /api/user-recipes
 * 
 * Requires a valid user session. If the user is not logged in,
 * returns a 401 Unauthorized.
 * 
 * Returns a JSON array of recipes authored by the user.
 * 
 * @author James Smith
 * @author hhttps://chat.openai.com
 */
export const getUserRecipes = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT r.recipe_id, r.recipe_title, r.description, r.steps, r.num_of_favorites
        FROM recipes r
        WHERE r.author_id = ?
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
    console.error("Error fetching user recipes:", error);
    res.status(500).json({ message: "Error fetching user recipes" });
  }
};

/**
 * Delete a recipe, only if the current user is the author.
 *
 * Route: DELETE /api/user-recipes/:id
 * 
 * Requires a valid user session. If the user is not logged in,
 * returns 401 Unauthorized.
 * 
 * If the user does not own the recipe, returns 403 Forbidden.
 * 
 * Deletes the recipe from the database and any related data
 * (e.g., tags, ingredients) in a single atomic transaction.
 * 
 * @author James Smith
 * @author https://chatgpt.com/
 */
export const deleteUserRecipe = async (req, res) => {
  const userId = req.session.userId;
  const recipeId = parseInt(req.params.id, 10);

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    // Step 1. verify the recipe belongs to the current user.
    const ownershipCheck = await new Promise((resolve, reject) => {
      db.query(
        "SELECT author_id FROM recipes WHERE recipe_id = ?",
        [recipeId],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    if (ownershipCheck.length === 0 || ownershipCheck[0].author_id !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    // Step 2. Begin transaction to ensure atomic deletion
    await new Promise((resolve, reject) => {
      db.beginTransaction(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Delete all related records first 
    // (note: database is set with cascading delete, associated join tables are deleted with recipe)
    const deleteOperations = [
      "DELETE FROM recipes WHERE recipe_id = ?"
    ];

    for (const query of deleteOperations) {
      await new Promise((resolve, reject) => {
        db.query(query, [recipeId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Step 4. Commit the transaction
    await new Promise((resolve, reject) => {
      db.commit(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    // Step 5. Rollback transaction on error
    await new Promise(resolve => {
      db.rollback(() => resolve());
    });
    
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Error deleting recipe" });
  }
};