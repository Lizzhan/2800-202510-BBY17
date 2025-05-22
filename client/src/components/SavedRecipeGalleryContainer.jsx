import { useEffect, useState } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

/**
 * GalleryComponent for recipes a user has written.
 * 
 * Displays a horizontal scrolling gallery of recipe cards based on a user's written recipes.
 * Users can "heart" these recipes, or delete them (with a confirmation).
 * 
 * @author Kaid Krawchuk
 * @author James Smith
 * @author Liam Pickrell
 * @author Net Ninja
 * @author https://chat.openai.com
 */
export default function GalleryContainer({ showSavedOnly = false, uploadedOnly = false }) {
  // Holds the list of recipes to display
  const [recipes, setRecipes] = useState([]);

  //Error message if fetch fails
  const [error, setError] = useState(null);

  // Loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Controls visibility of delete confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Tracks which recipe is being targeted for deletion 
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  /**
   *  Fetch recipes uploaded by current user
   */ 
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

  /**
   * Delete a recipe by it's ID, then removes it from the local state
   * @param {number} recipeId - ID of te recipe to delete
   */
  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/user-recipes/${recipeId}`, {
        withCredentials: true
      });
      // Remove the deleted recipe from UI
      setRecipes(prev => prev.filter(recipe => recipe.recipe_id !== recipeId));
      return true;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      return false;
    } finally {
      // Hide modal and reset selection
      setShowConfirmModal(false);
      setRecipeToDelete(null);
    }
  };

  /**
   * Open Confirmation Modal for a given recipe.
   * @param {number} recipeId 
   */
  const confirmDelete = (recipeId) =>
  {
    setRecipeToDelete(recipeId);
    setShowConfirmModal(true);
  };

  /**
   * Cancels the delete action, closes modal 
   */
  const cancelDelete = (recipeId) =>
  {
    setRecipeToDelete(null);
    setShowConfirmModal(false);
  };

  // Fetches recipes when component mounts or filter props change.
  useEffect(() => 
  {
    const fetchRecipes = async () => {
      try 
      {
        let data;
        if (showSavedOnly) {
          const response = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/saved-recipes', {
            withCredentials: true
        });
          data = response.data;
        } 
        else if (uploadedOnly) 
        {
          // Fetch Uploaded Recipes
          data = await fetchUserRecipes();
        } else {
          const response = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/recipes', {
            withCredentials: true
        });
          data = response.data;
        }

        // Attaches a dynamic image to each recipe using Unsplash
        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description || '',
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

  // Conditional rendering for loading/error/empty state
  if (loading) return <p className="text-center">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (recipes.length === 0) return <p className="text-center text-gray-500">No recipes to display.</p>;

  return (
    <div className="bg-white rounded-lg px-4 py-6 mx-2 shadow-lg">
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
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
      </div>
    

      {/* confirmation modal for deleting recipe.
          Adapted from code provided by Net Ninja on youtube

          @author Net Ninja on Youtube 
          @author James Smith
          @see https://www.youtube.com/watch?v=tt5uUMQgzl0&list=PL4cUxeGkcC9joIM91nLzd_qaH_AimmdAR&index=16 */
      }
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this recipe?</p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDeleteRecipe(recipeToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
