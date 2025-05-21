import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

/**
 * Backend controller that sends a list of ingredients to the Gemini API
 * to generate a humorous recipe. The response is parsed to extract the
 * recipe name, description, steps, and ingredients for frontend display.
 *
 * This feature is used to provide a fun and engaging AI-generated recipe
 * experience based on a user's fridge contents.
 *
 * @param {Object} req - Express request object, expects `ingredients` in the body.
 * @param {Object} res - Express response object, returns structured recipe data.
 *
 * @author Lucas Liu
 * @author https://chat.openai.com
 */
export const generateFunnyRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  // Validate input
  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

  // Shuffle the ingredients to vary the AI prompt
  const shuffledIngredients = [...ingredients].sort(() => Math.random() - 0.5);

  // AI prompt designed to get a structured, funny recipe
  const prompt = `You're a goofy chef. Create a made-up, funny recipe using these ingredients (you don't need to use all of them): ${shuffledIngredients.join(', ')}.

Return ONLY the following:
- A funny recipe name in bold (e.g., **Leaf Bucket** or **Pepper Cheese 360** — do not include the food type like "salad" or "pizza")
- A short, funny description (1–2 sentences)
- 3 to 5 ridiculous, numbered steps
- A list of ingredients used (bullet-pointed, real or ridiculous)

Don't add anything else — no intros or sign-offs try not to give me the same recipe.`;

  try {
    // Send prompt to Gemini API
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

    // Log the raw response for debugging
    console.log("🧠 Gemini Raw Response:\n", JSON.stringify(data, null, 2));

    // Check if response contains valid content
    if (!data.candidates || !data.candidates[0]?.content?.parts?.length) {
      return res.status(502).json({ error: 'No content received from Gemini.' });
    }

    const fullText = data.candidates[0].content.parts[0].text.trim();

    // Extract recipe name from bold **text**
    const nameMatch = fullText.match(/\*\*(.*?)\*\*/);
    const name = nameMatch ? nameMatch[1].trim() : 'Unnamed Recipe';

    // Extract description (between name and first step)
    const descMatch = fullText.match(/\*\*.*?\*\*\n\n(.*?)\n\n1\./s);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract numbered steps
    const stepsMatch = fullText.match(/1\..*?(?=\n\n\*|\n\*)/s);
    const steps = stepsMatch
      ? stepsMatch[0]
          .split('\n')
          .map(line => line.trim())
          .filter(line => /^\d+\./.test(line))
      : [];

    // Extract ingredients (bullet list after "Ingredients:" label)
    let parsedIngredients = [];
    const ingredientsMatch = fullText.match(/Ingredients:\n([\s\S]*)/);

    if (ingredientsMatch) {
      parsedIngredients = ingredientsMatch[1]
        .split('\n')
        .map(line => line.replace(/^\*+\s*/, '').trim())
        .filter(line => line.length > 0);
    } else {
      // Fallback: try to extract the last bullet list if labeled section is missing
      const bulletsMatch = fullText.match(/\n\*[\s\S]+$/);
      if (bulletsMatch) {
        parsedIngredients = bulletsMatch[0]
          .split('\n')
          .map(line => line.replace(/^\*+\s*/, '').trim())
          .filter(line => line.length > 0);
      }
    }

    // Return the structured recipe back to the frontend
    res.json({
      name,
      description,
      steps,
      ingredients: parsedIngredients
    });

  } catch (err) {
    // Log and return internal server error
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate recipe from Gemini" });
  }
};
