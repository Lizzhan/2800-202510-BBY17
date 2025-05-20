import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getClosestImagePath } from '../utils/getClosestImagePath';

export default function RecipeCard({ recipe, initiallyLiked = false }) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [popping, setPopping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  const shortDescription = recipe.description?.length > 100
    ? recipe.description.slice(0, 100) + '...'
    : recipe.description;

  const handleLikeClick = async (e) => {
  e.stopPropagation();
  try {
    // Trigger pop animation
    setPopping(true);
    setTimeout(() => setPopping(false), 300); // Duration matches the CSS animation

    if (!liked) {
      await axios.post('http://localhost:3000/api/save-recipe', { user_recipe_id: recipe.recipe_id }, { withCredentials: true });
    } else {
      await axios.post('http://localhost:3000/api/unsave-recipe', { user_recipe_id: recipe.recipe_id }, { withCredentials: true });
    }

    setLiked(!liked);
  } catch (error) {
    console.error('Error updating saved recipe:', error);
  }
};


  const handleCardClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-black dark:border-black"
    >
      <img className="object-cover w-full h-48" src={getClosestImagePath(recipe.recipe_title)} alt={recipe.recipe_title} />
      <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow group">
  <div className="overflow-hidden">
    <h1
      className="font-lora text-lg font-bold text-gray-800 truncate max-w-[12rem] group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
      title={recipe.recipe_title}
    >
      {recipe.recipe_title}
    </h1>
  </div>
    <button
    onClick={handleLikeClick}
    className="focus:outline-none ml-2 shrink-0"
  >
      <svg
  className={`w-6 h-6 transform transition duration-300 ease-in-out
    ${liked ? 'text-buttonPeach' : 'text-kaidCream hover:text-buttonPeach'}
    ${popping ? 'scale-125' : 'scale-100'}
  `}
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
</div>
  );
}
