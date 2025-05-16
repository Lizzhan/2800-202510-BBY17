import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipePage() {
  const { id } = useParams(); // Get recipe_id from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Recipe not found');
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading recipe...</div>;
  if (!recipe) return <div className="p-6 text-center text-red-500">Recipe not found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold">{recipe.recipe_title}</h1>

      {/* Image */}
      <img
        className="w-full h-64 object-cover rounded"
        src={`https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`}
        alt={recipe.recipe_title}
      />

      {/* Description */}
      <p className="text-gray-700">{recipe.description}</p>

      {/* Ingredients */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Ingredients</h2>
          <p className="whitespace-pre-wrap text-gray-800">
        {Array.isArray(recipe.ingredients)
           ? recipe.ingredients
            .map((ing, i) => `${i + 1}. ${ing.charAt(0).toUpperCase() + ing.slice(1)}`)
            .join('\n')
           : recipe.ingredients}
           </p>
      </div>


      {/* Steps */}
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
