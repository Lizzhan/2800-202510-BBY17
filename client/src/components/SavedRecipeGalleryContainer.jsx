
import { useEffect, useState } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

export default function GalleryContainer({ showSavedOnly = false, uploadedOnly = false }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url;
        if (showSavedOnly) {
          url = 'http://localhost:3000/api/saved-recipes';
        } else if (uploadedOnly) {
          url = 'http://localhost:3000/api/my-recipes'; 
        } else {
          url = 'http://localhost:3000/api/recipes';
        }

        const response = await axios.get(url, { withCredentials: true });
        const data = response.data;

        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description || '',
          image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
        }));

        setRecipes(processed);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Could not load recipes');
      }
    };

    fetchRecipes();
  }, [showSavedOnly, uploadedOnly]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (recipes.length === 0) return <p className="text-center text-gray-500">No recipes to display.</p>;

  return (
  <div className="overflow-x-auto whitespace-nowrap px-2 py-4 scrollbar-hide">
    <div className="flex gap-4">
      {recipes.map(recipe => (
        <div key={recipe.recipe_id} className="inline-block min-w-[16rem] max-w-[20rem]">
          <RecipeCard recipe={recipe} initiallyLiked={true} />
        </div>
      ))}
    </div>
  </div>
)};
