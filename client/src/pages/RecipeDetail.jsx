import { useEffect, useState } from 'react';
/**
 * the recipe detail pages that fetches ingredient from the user database and try to create a funny recipe
 * with ai prompt on the back end. then displays the recipe  on the page. Help from chatgpt was used to complete
 * the code. 
 * @author Lucas Liu 
 * @author https://chat.openai.com
 */
export default function RecipeDetail() {
  //the data state used to show the recipe when the ai finishes generates the data
  const [recipe, setRecipe] = useState(null);
  //the loading state used for when the ai is still generating the data
  const [loading, setLoading] = useState(true);

  //the function to fetch the user id and then passing it to the ai back end. 
  useEffect(() => {
    const fetchAIRecipe = async () => {
      try {
        // Get the logged-in user's ID
        const userRes = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include',
        });
        const userData = await userRes.json();
        //assign the userID
        const userId = userData?.id;
        //if no userid is assigned then the user is not logged in
        if (!userId) throw new Error('User not authenticated');

        //Get all ingredients for that user
        const ingRes = await fetch(`http://localhost:3000/api/allingredients/${userId}`, {
          credentials: 'include',
        });
        const ingredients = await ingRes.json();

        // 🔹 Ask AI for a recipe based on the user's ingredients
        const aiRes = await fetch('http://localhost:3000/api/funnyRecipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ingredients }),
        });

        const aiRecipe = await aiRes.json();
        //display the recipe after ai finishes  generating the the recipe
        setRecipe(aiRecipe);
      } catch (err) {
        console.error('Failed to generate recipe:', err);
      } finally {
        //remove the loading state. 
        setLoading(false);
      }
    };
    fetchAIRecipe();
  }, []);

  //show message for when loading the recipe and when ai could not make an recipe
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
