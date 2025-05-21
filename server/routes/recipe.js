import express from 'express'; // Import express framework
import db from '../db.js'; // Import database connection module

const router = express.Router(); // Create a new Express router instance

/**
 * Route to get all recipes, ordered by newest first. Used in the home page.
 * Uses the SQL query to select all columns from the recipes table and 
 * orders them by recipe_id in descending order. The results are returned 
 * as a JSON response. Catches errors and logs them, returning a 500 
 * status code if an error occurs.
 */
router.get('/recipes', (req, res) => {
  try {
    const q = 'SELECT * FROM recipes ORDER BY recipe_id DESC'; // SQL query to fetch all recipes, newest first

    // Execute the query
    db.query(q, (err, data) => {
      if (err) return err; // If error occurs, just return it (consider improving error handling here)
      console.log(data); 

      res.json(data);  // Respond with JSON array of all recipes
    });

  } catch (error) {
    // Catch any unexpected errors and respond with 500 status
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Route to get a specific recipe by its ID, including its ingredients. Used
 * in specific recipe pages and populates the recipe details and ingredients onto
 * RecipePage.jsx. The recipe ID is extracted from the URL parameters.
 * The first SQL query fetches the recipe details from the recipes table and only 
 * returns the first recipe's details that matches the ID. The second SQL 
 * query fetches the ingredient names linked to the recipe from the 
 * recipe_ingredients and ingredients tables. Throws errors if there are 
 * issues with either of the queries. 
 */
router.get('/recipes/:id', (req, res) => {
  const recipeId = req.params.id; // Extract recipe ID from URL parameters

  // SQL query to fetch the recipe details by ID
  const recipeQuery = 'SELECT * FROM recipes WHERE recipe_id = ?';

  // SQL query to fetch ingredient names linked to the recipe
  const ingredientsQuery = `
    SELECT i.ingredient AS ingredient_name
    FROM recipe_ingredients ri
    JOIN ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE ri.recipe_id = ?
  `;

  // Query the recipe details first
  db.query(recipeQuery, [recipeId], (err, recipeData) => {
    if (err) {
      console.error('Error fetching recipe:', err);
      return res.status(500).json({ error: 'Database error' }); // Return error response if DB query fails
    }

    // If no recipe found with that ID, send 404 Not Found
    if (recipeData.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // If recipe found, query the ingredients for that recipe
    db.query(ingredientsQuery, [recipeId], (err, ingredientsData) => {
      if (err) {
        console.error('Error fetching ingredients:', err);
        return res.status(500).json({ error: 'Database error' }); // Return error if ingredients query fails
      }

      const recipe = recipeData[0]; // Take the first (and only) recipe record
      // Map ingredient rows to an array of ingredient names
      recipe.ingredients = ingredientsData.map(row => row.ingredient_name);

      // Respond with the recipe object including its ingredients array
      res.json(recipe);
    });
  });
});

// Export the router for use in your main app
export default router; 
