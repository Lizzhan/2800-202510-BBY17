import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecipeCard({ title, image, recipeId, initiallyLiked = false }) {
  const [liked, setLiked] = useState(initiallyLiked);

  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  const handleLikeClick = async () => {
    try {
      if (!liked) {
        await axios.post('http://localhost:3000/api/save-recipe', { user_recipe_id: recipeId }, { withCredentials: true });
      } else {
        await axios.post('http://localhost:3000/api/unsave-recipe', { user_recipe_id: recipeId }, { withCredentials: true });
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating saved recipe:', error);
    }
  };

  return (
    <div className="max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-kaidBrown border-gray-200 dark:border-gray-700">
      <img className="object-cover w-full h-48" src={image} alt={title} />
      <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow dark:bg-gray-700 dark:border-gray-600">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <button 
          onClick={handleLikeClick} 
          className="focus:outline-none"
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
      </div>
    </div>
  );
}
