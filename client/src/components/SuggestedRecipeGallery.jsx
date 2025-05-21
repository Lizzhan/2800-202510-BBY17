import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './recipecard';

/**
 * Displays a grid of suggested recipe cards in a responsive gallery layout.
 * This component checks which recipes have been favorited by the user and updates
 * the UI accordingly (i.e., showing a "liked" heart icon).
 *
 * The favorite-checking logic was adapted with inspiration from Kaid's implementation.
 *
 * @author Lucas Liu
 * @author Kaid Krawchuk
 */
export default function SuggestedRecipeGallery({ recipes }) {
  // State to store the list of recipes the user has favorited (saved)
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Fetch the user's saved (favorited) recipes from the backend when the component mounts
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com:3000/api/saved-recipes', {
          withCredentials: true,
        });
        // Store the list of saved recipes in state to determine "liked" status
        setSavedRecipes(res.data || []);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setSavedRecipes([]); // fallback to empty array if there's an error
      }
    };

    fetchSavedRecipes();
  }, []);

  // Show a message if there are no suggested recipes
  if (!recipes || recipes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No suggested recipes found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {recipes.map((recipe) => {
        // Determine if this recipe has been favorited by checking multiple matching strategies
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
                image:
                  recipe.image ||
                  `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`,
              }}
              initiallyLiked={isLiked}
            />
          </div>
        );
      })}
    </div>
  );
}
