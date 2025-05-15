import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const generateFunnyRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

  const prompt = `You're a goofy chef. Create a made-up, funny recipe using these ingredients (you don't need to use all of them): ${ingredients.join(', ')}.

Return ONLY the following:
- A funny recipe name in bold (e.g., **Leaf Bucket** or **Pepper Cheese 360** — do not include the food type like "salad" or "pizza")
- A short, funny description (1–2 sentences)
- 3 to 5 ridiculous, numbered steps
- A list of ingredients used (bullet-pointed, real or ridiculous)

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

    // Extract name (from **bold**)
    const nameMatch = fullText.match(/\*\*(.*?)\*\*/);
    const name = nameMatch ? nameMatch[1].trim() : 'Unnamed Recipe';

    // Extract description (between name and step 1)
    const descMatch = fullText.match(/\*\*.*?\*\*\n\n(.*?)\n\n1\./s);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract steps (1. ... numbered format)
    const stepsMatch = fullText.match(/1\..*?(?=\n\n\*|\n\*)/s);
    const steps = stepsMatch
      ? stepsMatch[0]
          .split('\n')
          .map(line => line.trim())
          .filter(line => /^\d+\./.test(line))
      : [];

    // Extract ingredients (bullet list after steps)
    let parsedIngredients = [];
    const ingredientsMatch = fullText.match(/Ingredients:\n([\s\S]*)/);

    if (ingredientsMatch) {
      parsedIngredients = ingredientsMatch[1]
        .split('\n')
        .map(line => line.replace(/^\*+\s*/, '').trim())
        .filter(line => line.length > 0);
    } else {
      // fallback: try to grab last bullet list in the text
      const bulletsMatch = fullText.match(/\n\*[\s\S]+$/);
      if (bulletsMatch) {
        parsedIngredients = bulletsMatch[0]
          .split('\n')
          .map(line => line.replace(/^\*+\s*/, '').trim())
          .filter(line => line.length > 0);
      }
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
