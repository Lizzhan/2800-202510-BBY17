
// This is original dummy recipes:

// import { useState } from 'react';

// export default function RecipeCard({ title, image }) {
//   const [liked, setLiked] = useState(false);

//   return (
//     <div className="max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-kaidBrown border-gray-200 dark:border-gray-700">
//       <img className="object-cover w-full h-48" src={image} alt={title} />
//       <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow dark:bg-gray-700 dark:border-gray-600">
//         <h1 className="text-lg font-bold text-grey-800">{title}</h1>
//         <button
//           onClick={() => setLiked(!liked)}
//           className={`transition-colors duration-300 focus:outline-none ${
//             liked ? 'text-buttonPeach' : 'text-kaidCream hover:text-buttonPeach'
//           }`}
//         >
//           <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
//                      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
//                      4.5 2.09C13.09 3.81 14.76 3 16.5 3 
//                      19.58 3 22 5.42 22 8.5c0 3.78-3.4 
//                      6.86-8.55 11.54L12 21.35z"/>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }


// This is unclickable version but inputted from the database:

// import { useState } from 'react';

// export default function RecipeCard({ title, image, description }) {
//   const [liked, setLiked] = useState(false);
//   const shortDescription = description?.length > 100 
//     ? description.slice(0, 100) + '...' 
//     : description;

//   return (
//     <div className="max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-kaidBrown border-gray-200 dark:border-gray-700">
//       <img className="object-cover w-full h-48" src={image} alt={title} />
//       <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow dark:bg-gray-700 dark:border-gray-600">
//         <h1 className="text-lg font-bold text-grey-800">{title}</h1>
//         <button
//           onClick={() => setLiked(!liked)}
//           className={`transition-colors duration-300 focus:outline-none ${
//             liked ? 'text-buttonPeach' : 'text-kaidCream hover:text-buttonPeach'
//           }`}
//         >
//           <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
//                      2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
//                      4.5 2.09C13.09 3.81 14.76 3 16.5 3 
//                      19.58 3 22 5.42 22 8.5c0 3.78-3.4 
//                      6.86-8.55 11.54L12 21.35z"/>
//           </svg>
//         </button>
//       </div>
//       <div className="px-4 py-2">
//         <p className="text-sm text-gray-700 dark:text-gray-300">{shortDescription}</p>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const shortDescription = recipe.description?.length > 100
    ? recipe.description.slice(0, 100) + '...'
    : recipe.description;

  const handleCardClick = (e) => {
    // Prevent like button clicks from triggering navigation
    if (e.target.closest('button')) return;
    navigate(`/recipe/${recipe.recipe_id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer max-w-xs w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-2 border-kaidBrown border-gray-200 dark:border-gray-700"
    >
      <img className="object-cover w-full h-48" src={recipe.image} alt={recipe.recipe_title} />
      <div className="flex items-center justify-between px-4 py-2 bg-sunshineYellow border-2 border-sunshineYellow dark:bg-gray-700 dark:border-gray-600">
        <h1 className="text-lg font-bold text-grey-800">{recipe.recipe_title}</h1>
        <button
          onClick={() => setLiked(!liked)}
          className={`transition-colors duration-300 focus:outline-none ${
            liked ? 'text-buttonPeach' : 'text-kaidCream hover:text-buttonPeach'
          }`}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                     4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                     6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div className="px-4 py-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">{shortDescription}</p>
      </div>
    </div>
  );
}

