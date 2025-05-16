import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RecipePage() {
  const { id } = useParams(); // Get recipe_id from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Fetch recipe data
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

  // Fetch saved recipes to check if this one is already liked
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true,
        });
        const savedIds = res.data;
        setLiked(savedIds.includes(parseInt(id)));
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
      }
    };

    fetchSavedStatus();
  }, [id]);

  // Toggle save/unsave
  const handleLikeClick = async () => {
    try {
      if (!liked) {
        await axios.post(
          'http://localhost:3000/api/save-recipe',
          { user_recipe_id: recipe.recipe_id },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          'http://localhost:3000/api/unsave-recipe',
          { user_recipe_id: recipe.recipe_id },
          { withCredentials: true }
        );
      }
      setLiked(!liked);
    } catch (err) {
      console.error('Error updating recipe save:', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading recipe...</div>;
  if (!recipe) return <div className="p-6 text-center text-red-500">Recipe not found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Title with Heart Icon */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{recipe.recipe_title}</h1>
        <button onClick={handleLikeClick} className="ml-4 focus:outline-none" title={liked ? "Unsave" : "Save"}>
          <svg
          className={`w-7 h-7 transition-all duration-300 transform ${
           liked
             ? 'text-buttonPeach scale-110'
              : 'text-red-300 hover:text-buttonPeach hover:scale-110'
          }`}   
           fill="currentColor"
           viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
               4.5 2.09C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5c0 3.78-3.4 
              6.86-8.55 11.54L12 21.35z"/>
          </svg>

        </button>
      </div>

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

