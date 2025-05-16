import dotenv from 'dotenv';
import fetch from 'node-fetch';
import db from '../db.js';

dotenv.config();

export const generateRegularRecipeName = async (req, res) => {
  try {
    // Step 1: Fetch ingredients from DB
    const ingredientQuery = 'SELECT * FROM ingredients';
    db.query(ingredientQuery, async (err, ingredientRows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch ingredients' });

      const ingredientList = ingredientRows.map(i => i.ingredient);

      // Step 2: Create Gemini Prompt
      const prompt = `
Generate a recipe using ingredients from this list only(doesnt have to include all the ingredient make it good): ${ingredientList.join(', ')}.
Do not invent ingredients or add extras. Ingredient names must match the list exactly.

Respond with only the following, no markdown formatting, and follow the structure exactly:

- First line: Recipe title (plain text, no symbols).
- Second line: Description (1–2 sentences).
- Next: 3 to 5 numbered steps, each on its own line.
- A section titled "Ingredients used:" followed by bullet points.
`;

      // Step 3: Call Gemini
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

      // Step 4: Parse response
      const fullText = data.candidates[0].content.parts[0].text.trim();
      const lines = fullText.split('\n').map(line => line.trim()).filter(Boolean);

      const name = lines[0];
      const indexOfStep1 = lines.findIndex(line => /^1\./.test(line));
      const description = indexOfStep1 > 1 ? lines.slice(1, indexOfStep1).join(' ') : '';

      const stepsMatch = fullText.match(/1\..*?(?=\n+(Ingredients used:))/is);
      const steps = stepsMatch
        ? stepsMatch[0].split('\n').filter(line => /^\d+\./.test(line))
        : [];

      const ingredientsMatch = fullText.match(/Ingredients used:\s*\n([\s\S]*)$/i);
      const parsedIngredients = ingredientsMatch
        ? ingredientsMatch[1].split('\n').map(line => line.replace(/^\*+\s*/, '').trim()).filter(Boolean)
        : [];

      // Step 5: Insert recipe
      const insertRecipeQuery = `
        INSERT INTO recipes (recipe_title, description, steps, num_of_favorites)
        VALUES (?, ?, ?, 0)
      `;
      const recipeValues = [name, description, steps.join('\n')];

      db.query(insertRecipeQuery, recipeValues, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to insert recipe' });

        const recipeId = result.insertId;

        // Step 6: Insert into recipe_ingredients
        parsedIngredients.forEach((ingName) => {
          const ingRow = ingredientRows.find(i => i.ingredient.toLowerCase() === ingName.toLowerCase());
          if (!ingRow) return console.warn(`❗ Ingredient not found: ${ingName}`);

          db.query(
            'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
            [recipeId, ingRow.ingredient_id],
            (err) => {
              if (err) console.error(`❌ Ingredient insert failed: ${ingName}`, err);
            }
          );
        });

        // Final response
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
