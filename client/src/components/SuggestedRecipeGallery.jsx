import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './recipecard';
/**
 * suggested recipe in a gallery that is based on  what recipe is passed or all the ingredient in the fridge. Back-end function
 * is called to check for recipe is favorited. favorite recipe part of the code was taken after studying kaid's code.
 * 
 * @param the list of recipes fetched from the back end 
 * @author Lucas Liu
 * @author Kaid Krawchuk
 */
export default function SuggestedRecipeGallery({ recipes }) {
  //state used to determine if a recipe is favorited or no
  const [savedRecipes, setSavedRecipes] = useState([]);

  //back-end call use to determine if the recipe have been favorited by the user.
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true,
        });
        //if the recipe is favorited then set the sate so the heart will light up
        setSavedRecipes(res.data || []);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipes();
  }, []);

  //if we cant find the recipe based on the ingredient then just show a message. 
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
