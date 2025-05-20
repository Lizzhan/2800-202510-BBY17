import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './recipecard';

export default function SuggestedRecipeGallery({ recipes }) {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true,
        });
        setSavedRecipes(res.data || []);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipes();
  }, []);

  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-gray-500">No suggested recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {recipes.map((recipe) => {
        const isLiked =
          Array.isArray(savedRecipes) &&
          savedRecipes.some((saved) =>
            saved.recipe_id === recipe.recipe_id ||
            saved.user_recipe_id === recipe.recipe_id ||
            saved === recipe.recipe_id ||
            saved === String(recipe.recipe_id)
          );

        return (
          <div key={recipe.recipe_id}>
            <RecipeCard
              recipe={{
                ...recipe,
                image: recipe.image || `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
              }}
              initiallyLiked={isLiked}
            />
          </div>
        );
      })}
    </div>
  );
}
