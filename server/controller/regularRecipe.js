import dotenv from 'dotenv';
import fetch from 'node-fetch';
import db from '../db.js';

dotenv.config();

/**
 * Backend controller that generates a regular (non-funny) recipe using the Gemini API
 * based on a shuffled list of all ingredients in the database. The result is parsed
 * and stored in the `recipes` and `recipe_ingredients` tables.
 *
 * The Gemini prompt is structured to return a clean, predictable text format
 * with a title, description, steps, and a list of used ingredients.
 * 
 * Help from chatgpt was used to complete part of this code
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @author Lucas Liu
 * @author https://chat.openai.com
 */
export const generateRegularRecipeName = async (req, res) => {
  try {
    // Step 1: Fetch all ingredients from the database
    const ingredientQuery = 'SELECT * FROM ingredients';
    db.query(ingredientQuery, async (err, ingredientRows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch ingredients' });

      // Shuffle ingredient names to vary AI results
      const ingredientList = ingredientRows
        .map(i => i.ingredient)
        .sort(() => Math.random() - 0.5);

      // Step 2: Construct Gemini prompt
      const prompt = `Give me a recipe based on the following ingredients: ${ingredientList.join(', ')}.
You do not need to use all of them and dont add ingredients. and please keep ingredient exactly the name that i have send you.

Respond using the following clear format:
- Title of the recipe on the first line.
- A short description (1–2 sentences) below the title.
- 3 to 5 numbered steps, each on its own line.
- A list of ingredients used, each on its own line dont add dashes or lines in front of it, introduced by "Ingredients used:".

Do NOT include any introductions, explanations, or extra commentary. Just give the recipe in this format. dont give me any format or any astrix or hashtags just give me text. try not to give me the same recipe not bolt no ephasis`;

      // Step 3: Send prompt to Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]?.content?.parts?.length) {
        return res.status(502).json({ error: 'No content received from Gemini' });
      }

      // Step 4: Parse Gemini response
      const fullText = data.candidates[0].content.parts[0].text.trim();
      const lines = fullText.split('\n').map(line => line.trim()).filter(Boolean);

      const name = lines[0]; // First line = title
      const indexOfStep1 = lines.findIndex(line => /^1\./.test(line));
      const description = indexOfStep1 > 1 ? lines.slice(1, indexOfStep1).join(' ') : '';

      const stepsMatch = fullText.match(/1\..*?(?=\n+(Ingredients used:))/is);
      const steps = stepsMatch
        ? stepsMatch[0].split('\n').filter(line => /^\d+\./.test(line))
        : [];

      const ingredientsMatch = fullText.match(/Ingredients used:\s*\n([\s\S]*)$/i);
      const parsedIngredients = ingredientsMatch
        ? ingredientsMatch[1]
            .split('\n')
            .map(line =>
              line.replace(/^[-*•–]+\s*/, '').trim() // Remove bullet symbols
            )
            .filter(Boolean)
        : [];

      // Step 5: Insert new recipe into the database
      const insertRecipeQuery = `
        INSERT INTO recipes (recipe_title, description, steps, num_of_favorites)
        VALUES (?, ?, ?, 0)
      `;
      const recipeValues = [name, description, steps.join('\n')];

      db.query(insertRecipeQuery, recipeValues, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to insert recipe' });

        const recipeId = result.insertId;

        // Step 6: Link ingredients to recipe, inserting new ones if needed
        parsedIngredients.forEach((ingName) => {
          const ingRow = ingredientRows.find(
            i => i.ingredient.toLowerCase() === ingName.toLowerCase()
          );

          if (ingRow) {
            // Ingredient exists — link it
            db.query(
              'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
              [recipeId, ingRow.ingredient_id],
              (err) => {
                if (err) console.error(`❌ Ingredient insert failed: ${ingName}`, err);
              }
            );
          } else {
            // Ingredient doesn't exist — insert it, then link it
            db.query(
              'INSERT INTO ingredients (ingredient) VALUES (?)',
              [ingName],
              (err, result) => {
                if (err) {
                  console.error(`❌ Failed to insert new ingredient: ${ingName}`, err);
                  return;
                }

                const newIngredientId = result.insertId;
                //console.log(`✅ Inserted new ingredient "${ingName}" with ID ${newIngredientId}`);

                db.query(
                  'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
                  [recipeId, newIngredientId],
                  (err) => {
                    if (err) console.error(`❌ Linking new ingredient failed: ${ingName}`, err);
                  }
                );
              }
            );
          }
        });

        // Step 7: Respond with structured recipe data
        res.json({
          name,
          description,
          steps,
          ingredients: parsedIngredients
        });
      });
    });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to generate recipe from Gemini' });
  }
};
