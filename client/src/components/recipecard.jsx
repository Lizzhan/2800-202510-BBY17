import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getClosestImagePath } from '../utils/getClosestImagePath';

/**
 * A reusable recipe card component used throughout the website to visually display
 * a recipe with an image, title, and short description. It includes functionality
 * to navigate to a detailed view and to like or unlike the recipe.
 *
 * The base design was inspired by Tailwind CSS examples. Additional functionality
 * was developed with assistance from ChatGPT.
 *
 * @author Lucas Liu
 * @author Kaid Krawchuk
 * @author https://chat.openai.com
 * @author https://flowbite.com
 */
export default function RecipeCard({ recipe, initiallyLiked = false, onDelete = null }) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [popping, setPopping] = useState(false);
  const navigate = useNavigate();

  // Sync internal liked state with prop when initiallyLiked changes
  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  // Truncate long descriptions to keep card size compact
  const shortDescription = recipe.description?.length > 100
    ? recipe.description.slice(0, 100) + '...'
    : recipe.description;

  // Handle like/unlike button click
  // Prevents card navigation and toggles recipe save status via API
  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent click from triggering navigation
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
      setLiked(!liked); // Toggle like state
    } catch (error) {
      console.error('Error updating saved recipe:', error);
    }
  };

  // Navigate to the detailed recipe page on card click
  const handleCardClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  // Render the recipe card
  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-black dark:border-black"
    >
      {/* Recipe image */}
      <img
        className="object-cover w-full h-48"
        src={getClosestImagePath(recipe.recipe_title)}
        alt={recipe.recipe_title}
      />

      {/* Title + Like button container */}
      <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow group">
        <div className="overflow-hidden">
          {/* Recipe title with responsive text behavior on hover */}
          <h1
            className="font-lora text-lg font-bold text-gray-800 truncate max-w-[12rem] group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
            title={recipe.recipe_title}
          >
            {recipe.recipe_title}
          </h1>
        </div>

        {/* Like (heart) button */}
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
                     6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
