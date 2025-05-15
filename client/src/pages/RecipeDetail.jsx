import { useEffect, useState } from 'react';

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 24; // 🔁 Replace with session user ID if you have one

  useEffect(() => {
    const fetchAIRecipe = async () => {
      try {
        const ingRes = await fetch(`http://localhost:3000/api/allingredients/${userId}`, {
          credentials: 'include',
        });
        const ingredients = await ingRes.json();

        const aiRes = await fetch('http://localhost:3000/api/funnyRecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ingredients }),
        });

        const aiRecipe = await aiRes.json();
        setRecipe(aiRecipe);
      } catch (err) {
        console.error('Failed to generate recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAIRecipe();
  }, []);

  if (loading) return <div className="p-6 text-center">Generating recipe...</div>;
  if (!recipe) return <div className="p-6 text-center text-red-500">No recipe found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold">{recipe.name}</h1>

      {/* Description */}
      <p className="text-gray-700">{recipe.description}</p>

      {/* Ingredients */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <p className="whitespace-pre-wrap text-gray-800">
          {Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients}
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Steps</h2>
        <p className="whitespace-pre-wrap text-gray-800">
          {Array.isArray(recipe.steps) ? recipe.steps.join('\n') : recipe.steps}
        </p>
      </div>
    </div>
  );
}
