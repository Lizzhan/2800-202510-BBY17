import dotenv from 'dotenv';
import fetch from 'node-fetch';
import db from '../db.js';

dotenv.config();

export const generateRegularRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

  const prompt = `Give me a recipe based on the following ingredients: ${ingredients.join(', ')}.
You do not need to use all of them and do not add ingredients. Keep the ingredient names exactly as I’ve provided.

Please respond using the following clear format, with **no markdown formatting** (no asterisks, hashtags, or other special characters):

- Title of the recipe on the first line (plain text only, no asterisks).
- A short description (1–2 sentences) on the next line.
- 3 to 5 numbered steps, each on its own line.
- A bullet list of ingredients used, introduced by "Ingredients used:", with each ingredient on a new line starting with "* ".

Do NOT include any intros, explanations, or extra commentary — just the recipe in this exact format.`;


  try {
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
    console.log("🧠 Gemini Raw Response:\n", JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0]?.content?.parts?.length) {
      return res.status(502).json({ error: 'No content received from Gemini.' });
    }

    const fullText = data.candidates[0].content.parts[0].text.trim();
    const lines = fullText.split('\n').map(line => line.trim()).filter(Boolean);

    const name = lines[0].replace(/^[-*]\s*/, '').trim();
    const indexOfStep1 = lines.findIndex(line => /^1\./.test(line));
    const description = indexOfStep1 > 1 ? lines.slice(1, indexOfStep1).join(' ') : '';

    const stepsMatch = fullText.match(/1\..*?(?=\n+(Ingredients(?: Used)?[:\-])|$)/is);
    const steps = stepsMatch
      ? stepsMatch[0].split('\n').map(line => line.trim()).filter(line => /^\d+\./.test(line))
      : [];

    const ingredientsMatch = fullText.match(/Ingredients(?: Used)?[:\-]?\n([\s\S]*)/i);
    const parsedIngredients = ingredientsMatch
      ? ingredientsMatch[1].split('\n').map(line => line.replace(/^\*+\s*/, '').trim()).filter(Boolean)
      : [];

    // Insert recipe
    const insertRecipeQuery = `
      INSERT INTO recipes (recipe_title, description, steps, num_of_favorites)
      VALUES (?, ?, ?, ?)
    `;
    const recipeValues = [name, description, steps.join('\n'), 0];

    db.query(insertRecipeQuery, recipeValues, async (err, result) => {
      if (err) {
        console.error('❌ Error inserting recipe:', err);
        return res.status(500).json({ error: 'Failed to insert recipe' });
      }

      const recipeId = result.insertId;
      console.log('✅ Recipe inserted with ID:', recipeId);

      // Fetch matching ingredient IDs
      for (const ingName of parsedIngredients) {
        const findIdQuery = 'SELECT ingredient_id FROM ingredients WHERE ingredient = ? LIMIT 1';
        db.query(findIdQuery, [ingName], (err, results) => {
          if (err) return console.error(`❌ Lookup failed for: ${ingName}`);
          if (results.length === 0) {
            console.warn(`⚠️ Ingredient not found: ${ingName}`);
            return;
          }

          const ingredientId = results[0].ingredient_id;
          const insertLinkQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)';
          db.query(insertLinkQuery, [recipeId, ingredientId], (err) => {
            if (err) console.error(`❌ Failed to link ingredient ${ingredientId}:`, err);
          });
        });
      }

      // Send final response
      res.json({
        name,
        description,
        steps,
        ingredients: parsedIngredients
      });
    });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate recipe from Gemini" });
  }
};
