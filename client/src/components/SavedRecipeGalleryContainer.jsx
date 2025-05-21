import { useEffect, useState } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

export default function GalleryContainer({ showSavedOnly = false, uploadedOnly = false }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user recipes
  const fetchUserRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user-recipes', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user recipes:', error);
      return [];
    }
  };

  // Delete a recipe
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user-recipes/${recipeId}`, {
        withCredentials: true
      });
      // Remove the deleted recipe from state
      setRecipes(prev => prev.filter(recipe => recipe.recipe_id !== recipeId));
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let data;
        if (showSavedOnly) {
          const response = await axios.get('http://localhost:3000/api/saved-recipes', {
            withCredentials: true
          });
          data = response.data;
        } else if (uploadedOnly) {
          data = await fetchUserRecipes();
        } else {
          const response = await axios.get('http://localhost:3000/api/recipes', {
            withCredentials: true
          });
          data = response.data;
        }

        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description || '',
          image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
        }));

        setRecipes(processed);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Could not load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [showSavedOnly, uploadedOnly]);

  if (loading) return <p className="text-center">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (recipes.length === 0) return <p className="text-center text-gray-500">No recipes to display.</p>;

  return (
    <div className="overflow-x-auto whitespace-nowrap px-2 py-4 scrollbar-hide">
      <div className="flex gap-4">
        {recipes.map(recipe => (
          <div key={recipe.recipe_id} className="inline-block min-w-[16rem] max-w-[20rem]">
            <RecipeCard 
              recipe={recipe} 
              initiallyLiked={true}
              onDelete={uploadedOnly ? () => handleDeleteRecipe(recipe.recipe_id) : null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};