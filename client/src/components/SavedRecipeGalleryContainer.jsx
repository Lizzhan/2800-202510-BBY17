import { useEffect, useState } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

export default function GalleryContainer({ showSavedOnly = false, uploadedOnly = false }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Fetch user recipes
  const fetchUserRecipes = async () => {
    try {
      const response = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/user-recipes', {
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
      await axios.delete(`https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/user-recipes/${recipeId}`, {
        withCredentials: true
      });
      // Remove the deleted recipe from state
      setRecipes(prev => prev.filter(recipe => recipe.recipe_id !== recipeId));
      return true;
    } catch (error) 
    {
      console.error('Error deleting recipe:', error);
      return false;
    }
    finally
    {
      setShowConfirmModal(false);
      setRecipeToDelete(null);
    }
  };

  const confirmDelete = (recipeId) =>
  {
    setRecipeToDelete(recipeId);
    setShowConfirmModal(true);
  }

  const cancelDelete = (recipeId) =>
  {
    setRecipeToDelete(null);
    setShowConfirmModal(false);
  }

  useEffect(() => 
  {
    const fetchRecipes = async () => {
      try {
        let data;
        if (showSavedOnly) {
          const response = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/saved-recipes', {
            withCredentials: true
          });
          data = response.data;
        } else if (uploadedOnly) {
          data = await fetchUserRecipes();
        } else {
          const response = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/recipes', {
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
              onDelete={uploadedOnly ? () => confirmDelete(recipe.recipe_id) : null}
            />
          </div>
        ))}
      </div>

      {showConfirmModal && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-6">Are You Sure You want to Delete this Recipe?</p>
          <div className="flex justify-end gap-3">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={cancelDelete}>
              Cancel      
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteRecipe(recipeToDelete)}>
              Delete      
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};