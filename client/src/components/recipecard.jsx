import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getClosestImagePath } from '../utils/getClosestImagePath';

/**
 * A reusable recipe card component used throughout the website to display a
 * recipe with its title, image, and like/delete options. Clicking the card
 * navigates to the detailed recipe page.
 *
 * This version includes an optional `onDelete` handler to allow deletion
 * (e.g., from the user's uploaded recipes list). The card is styled using Tailwind CSS.
 *
 * @param {Object} props
 * @param {Object} props.recipe - Recipe object containing title, description, and ID.
 * @param {boolean} [props.initiallyLiked=false] - Whether the recipe is already liked by the user.
 * @param {Function|null} [props.onDelete=null] - Optional function to delete the recipe.
 *
 * @author Lucas Liu
 * @author Kaid Krawchuk
 */
export default function RecipeCard({ recipe, initiallyLiked = false, onDelete = null }) {
  const [liked, setLiked] = useState(initiallyLiked);
  const navigate = useNavigate();

  // Sync liked state with prop changes
  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  // Shorten long descriptions for card layout
  const shortDescription = recipe.description?.length > 100
    ? recipe.description.slice(0, 100) + '...'
    : recipe.description;

  // Toggle like/unlike status and update backend
  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent card click navigation
    try {
      if (!liked) {
        await axios.post(
          'api/save-recipe',
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
    } catch (error) {
      console.error('Error updating saved recipe:', error);
    }
  };

  // Navigate to recipe detail page
  const handleCardClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  // Render the recipe card
  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-black dark:border-black"
    >
      {/* Recipe Image */}
      <img
        className="object-cover w-full h-48"
        src={getClosestImagePath(recipe.recipe_title)}
        alt={recipe.recipe_title}
      />

      {/* Title + Buttons Row */}
      <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow group">
        {/* Recipe Title with responsive overflow */}
        <div className="overflow-hidden">
          <h1
            className="font-lora text-lg font-bold text-gray-800 truncate max-w-[12rem] group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
            title={recipe.recipe_title}
          >
            {recipe.recipe_title}
          </h1>
        </div>

        {/* Like + Delete Buttons */}
        <div className="flex items-center space-x-2 ml-2 shrink-0">
          {/* Heart (like/unlike) button */}
          <button
            onClick={handleLikeClick}
            className="focus:outline-none ml-2 shrink-0"
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 transform ${
                liked
                  ? 'text-buttonPeach scale-110'
                  : 'text-kaidCream hover:text-buttonPeach hover:scale-110'
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

          {/* Trash (delete) button, shown only if onDelete is passed */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onDelete(); // Call parent delete handler
              }}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Delete Recipe"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
