import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const generateRegularRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

const prompt = `Give me a recipe based on the following ingredients: ${ingredients.join(', ')}.
You do not need to use all of them and dont add ingredients.

Respond using the following clear format:
- Title of the recipe on the first line.
- A short description (1–2 sentences) below the title.
- 3 to 5 numbered steps, each on its own line.
- A bullet list of ingredients used, each on its own line, introduced by "Ingredients used:".

Example format:

Recipe Title

This is a short description.

1. First step.
2. Second step.
3. Third step.

Ingredients used:
* ingredient one
* ingredient two

Do NOT include any introductions, explanations, or extra commentary. Just give the recipe in this format.`;


  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
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

    // Step 1: Recipe Name
    const name = lines[0].replace(/^[-*]\s*/, '').trim(); // remove dash or bullet if present

    // Step 2: Description
    let description = '';
    const indexOfStep1 = lines.findIndex(line => /^1\./.test(line));
    if (indexOfStep1 > 1) {
      description = lines.slice(1, indexOfStep1).join(' ');
    }

    // Step 3: Steps
    const stepsMatch = fullText.match(/1\..*?(?=\n+(Ingredients(?: Used)?[:\-])|$)/is);
    const steps = stepsMatch
      ? stepsMatch[0]
          .split('\n')
          .map(line => line.trim())
          .filter(line => /^\d+\./.test(line))
      : [];

    // Step 4: Ingredients
    let parsedIngredients = [];
    const ingredientsMatch = fullText.match(/Ingredients(?: Used)?[:\-]?\n([\s\S]*)/i);

    if (ingredientsMatch) {
      parsedIngredients = ingredientsMatch[1]
        .split('\n')
        .map(line => line.replace(/^\*+\s*/, '').trim())
        .filter(line => line.length > 0);
    }

    res.json({
      name,
      description,
      steps,
      ingredients: parsedIngredients
    });

  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate recipe from Gemini" });
  }
};
