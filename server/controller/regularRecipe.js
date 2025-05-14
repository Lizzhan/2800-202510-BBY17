import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const generateRegularRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

  const prompt = `Give me a recipe based on the list of ingredients. You don't have to use all of them: ${ingredients.join(', ')}.

Return ONLY the following:
- A recipe name
- A solid description (1–2 sentences)
- 3 to 5 numbered steps
- A list of ingredients used

Don't add anything else — no intros or sign-offs.`;

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

    // Title: always first line
    const name = lines[0];

    // Description: between name and first step
    const indexOfStep1 = lines.findIndex(line => /^1\./.test(line));
    let description = '';
    if (indexOfStep1 > 1) {
      description = lines.slice(1, indexOfStep1).join(' ');
    }

    // Steps: from "1." onward until the line before "Ingredients" section
    const stepsSection = fullText.match(/1\..*?(?=\n+(Ingredients|Ingredients Used)[:\-]?\n)/s);
    const steps = stepsSection
      ? stepsSection[0]
          .split('\n')
          .map(line => line.trim())
          .filter(line => /^\d+\./.test(line))
      : [];

    // Ingredients: match "Ingredients:" or "Ingredients Used:"
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
