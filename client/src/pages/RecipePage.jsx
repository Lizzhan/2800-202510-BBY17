/**
 * Completes the RecipePage component which displays the details of a recipe.
 * Utilizes logic from getClosestImagePath.js to fetch the closest image path based
 * on the recipe title. The component fetches the recipe data from the server using
 * recipe.js and populates the recipe details and ingredients onto the page. Uses 
 * similar logic to handle the saving and unsaving of recipes as seen in the 
 * recipecard.jsx file, created by Kaid Krawchuk. Utilized ChatGPT (version 4.0) 
 * to help create the functions and troubleshoot bugs.
 * 
 * @author: Liam Pickrell
 * @version: 1.0
 */

// Importing libraries and components.
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getClosestImagePath } from '../utils/getClosestImagePath';

export default function RecipePage() {
  const { id } = useParams(); // Get recipe_id from the URL parameters
  const [recipe, setRecipe] = useState(null); // State to store recipe data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [liked, setLiked] = useState(false); // State to track if recipe is saved/liked

  /**
   * Function that fetches the recipe data from the server based on the 
   * ID from the URL. Function is called when the component mounts or 
   * when the ID changes. Throws an error if the recipe is not found or
   * if there is a connection error with the database. Finally, it sets
   * the loading state to false which hides the loading message when the 
   * data is fetched.
   */
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
        setRecipe(data); // Store the recipe data in state
      } catch (err) {
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false); // Hide loading message once data is fetched
      }
    };

    fetchRecipe();
  }, [id]);

  /**
   * Fucntion that checks if the recipe is saved by the user. Fetches the
   * saved recipe IDs for the logged-in user and confirms if the current
   * recipe ID is among them. If it is, the liked state is set to true, else
   * it's false. Throws an error if there is a connection error with the database
   * or if there is an error fetching the saved recipe table.
   */
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true,
        });
        const savedIds = res.data;
        setLiked(savedIds.includes(parseInt(id))); // Check if this recipe is saved
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
      }
    };

    fetchSavedStatus();
  }, [id]);

  /**
   * Function that handles the click event on the save button. First, checks 
   * if the recipe is already saved. If it is, it sends a request to unsave 
   * the recipe, else, it is assumed the recipe isn't saved and therefore it
   * adds the recipe to the user's saved recipes. Throws an error if there is
   * an error with the request to the server or if there is a connection error.
   */
  const handleLikeClick = async () => {
    try {
      if (!liked) {
        // Saves the recipe (assumes currently unsaved)
        await axios.post(
          'http://localhost:3000/api/save-recipe',
          { user_recipe_id: recipe.recipe_id },
          { withCredentials: true }
        );
      } else {
        // Unsave the recipe (assumes currently saved)
        await axios.post(
          'http://localhost:3000/api/unsave-recipe',
          { user_recipe_id: recipe.recipe_id },
          { withCredentials: true }
        );
      }
      setLiked(!liked); // Toggle liked state
    } catch (err) {
      console.error('Error updating recipe save:', err);
    }
  };

  // Display loading state while fetching
  if (loading) return <div className="p-6 text-center">Loading recipe...</div>;

  // Handle case where recipe was not found
  if (!recipe) return <div className="p-6 text-center text-red-500">Recipe not found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Title and Like Button Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{recipe.recipe_title}</h1>
        <button onClick={handleLikeClick} 
        className="focus:outline-none ml-2 shrink-0" 
        title={liked ? "Unsave" : "Save"}>
          <svg
          className={`w-6 h-6 transition-all duration-300 transform ${
           liked
             ? 'text-buttonPeach scale-110'
              : 'text-kaidCream hover:text-buttonPeach hover:scale-110'
          }`}   
           fill="currentColor"
           viewBox="0 0 24 24"
           stroke={liked ? 'none' : 'rgba(0, 0, 0, 0.2)'} // faded black outline
           strokeWidth={liked ? 0 : 1.5} // subtle thickness
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
               4.5 2.09C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5c0 3.78-3.4 
              6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      {/* Recipe Image */}
      <img
        className="w-full h-64 object-cover rounded"
        src={getClosestImagePath(recipe.recipe_title)}
        alt={recipe.recipe_title}
      />

      {/* Recipe Description */}
      <p className="text-gray-700">{recipe.description}</p>

      {/* Ingredient List */}
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

      {/* Step-by-Step Instructions */}
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
