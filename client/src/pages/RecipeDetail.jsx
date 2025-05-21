import { useEffect, useState } from 'react';

/**
 * The RecipeDetail page fetches all ingredients from the logged-in user's database
 * and generates a humorous recipe using an AI backend prompt.
 * Once generated, the recipe is displayed on the page.
 *
 * Code completed with assistance from ChatGPT.
 *
 * @returns {JSX.Element} A dynamically generated recipe based on user's ingredients.
 *
 * @author Lucas Liu 
 * @see https://chat.openai.com
 */
export default function RecipeDetail() {
  // Stores the AI-generated recipe data
  const [recipe, setRecipe] = useState(null);

  // Tracks whether the recipe is still being generated
  const [loading, setLoading] = useState(true);

  // Fetches the user ID, retrieves ingredients, and calls the AI backend for a custom recipe
  useEffect(() => {
    const fetchAIRecipe = async () => {
      try {
        // Get the current user's ID from the session
        const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000/api/auth/me', {
          credentials: 'include',
        });
        const userData = await userRes.json();
        const userId = userData?.id;

        // If no user ID is found, stop and show an error
        if (!userId) throw new Error('User not authenticated');

        // Fetch all ingredients associated with this user
        const ingRes = await fetch(`https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000/api/allingredients/${userId}`, {
          credentials: 'include',
        });
        const ingredients = await ingRes.json();

        // Send ingredients to the backend AI to generate a funny recipe
        const aiRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000/api/funnyRecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ingredients }),
        });

        const aiRecipe = await aiRes.json();

        // Store the generated recipe in state
        setRecipe(aiRecipe);
      } catch (err) {
        console.error('Failed to generate recipe:', err);
      } finally {
        // Mark loading as complete regardless of success or failure
        setLoading(false);
      }
    };

    fetchAIRecipe();
  }, []);

  // Render loading or error states before displaying the recipe
  if (loading) return <div className="p-6 text-center">Generating recipe...</div>;
  if (!recipe) return <div className="p-6 text-center text-red-500">No recipe found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Recipe Title */}
      <h1 className="text-3xl font-semibold">{recipe.name}</h1>

      {/* Recipe Description */}
      <p className="text-gray-700">{recipe.description}</p>

      {/* Ingredients Section */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <p className="whitespace-pre-wrap text-gray-800">
          {Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join('\n')
            : recipe.ingredients}
        </p>
      </div>

      {/* Steps Section */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Steps</h2>
        <p className="whitespace-pre-wrap text-gray-800">
          {Array.isArray(recipe.steps)
            ? recipe.steps.join('\n')
            : recipe.steps}
        </p>
      </div>
    </div>
  );
}
