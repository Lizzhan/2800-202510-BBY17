import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const generateFunnyRecipeName = async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Missing or invalid ingredients array' });
  }

  const prompt = `You're a goofy chef. Create a made-up, funny recipe using these ingredients: ${ingredients.join(', ')}.

Return ONLY the following:
- A funny recipe name in bold (like **Leaf Bucket(salad) or pepper cheese 360(pizza) but dont include the proper recipe name **)
- A short, funny description (1–2 sentences)
- 3 to 5 ridiculous, numbered steps

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

    if (!data.candidates || !data.candidates[0]?.content?.parts?.length) {
      return res.status(502).json({ error: 'No content received from Gemini.' });
    }

    const fullText = data.candidates[0].content.parts[0].text.trim();

    // 🔍 Parse the response
    const nameLine = fullText.split('\n')[0];
    const name = nameLine.replace(/\*\*/g, '').trim();

    const descriptionMatch = fullText.match(/\n\n(.*?)\n\n/s);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    const stepsMatch = fullText.match(/1\..*/s);
    const steps = stepsMatch
      ? stepsMatch[0]
          .split('\n')
          .map(line => line.trim())
          .filter(line => /^\d\./.test(line))
      : [];

    res.json({ name, description, steps });

  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate recipe from Gemini" });
  }
};
