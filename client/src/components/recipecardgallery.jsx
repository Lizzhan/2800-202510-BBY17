import { useState, useEffect } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

/**
 * A scrollable grid component that displays a list of recipe cards with infinite scroll.
 * This gallery fetches all recipes from the backend and displays them in chunks, loading more
 * as the user scrolls. It also highlights recipes the user has already saved (liked) by
 * comparing against the user's saved recipes fetched from a separate endpoint.
 *
 * Uses Tailwind CSS for responsive layout and styling. Works in coordination with
 * the `RecipeCard` component to render individual recipe cards with like functionality.
 *
 * Portions of this code were generated with assistance from ChatGPT
 *  Prompts included:
 *    - "How to compare saved items to determine liked state in React?"
 * 
 * 
 * @component
 * @returns {JSX.Element} A responsive grid of recipe cards with lazy loading support.
 *
 * @author Kaid Krawchuk
 * @author Lucas Liu
 * 
 */

export default function RecipeCardGallery() {
  // ========== STATE VARIABLES ==========

  // All recipes fetched from the backend
  const [allRecipes, setAllRecipes] = useState([]);

  // Subset of recipes currently shown (first N for lazy loading)
  const [visibleRecipes, setVisibleRecipes] = useState([]);

  // List of recipes the current user has saved/favourited
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Loading state flag used to show a "Loading..." message initially
  const [loading, setLoading] = useState(true);

  // Error message string (if any fetch fails)
  const [error, setError] = useState(null);

  // Flag to determine whether more recipes are available to load
  const [hasMore, setHasMore] = useState(true);

  // How many recipes to show per "page" or scroll
  const ITEMS_PER_LOAD = 10;

  // ========== FETCH ALL RECIPES FROM BACKEND ==========

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // API call to fetch all recipes
        const response = await fetch('http://localhost:3000/api/recipes');
        if (!response.ok) throw new Error('Failed to fetch recipes');

        // Parse JSON data
        const data = await response.json();

        // Process raw recipe data to format it for the UI
        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description || '',
          // If no image is available, use a dynamic Unsplash placeholder
          image: recipe.image || `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
        }));

        // Save the full list of recipes
        setAllRecipes(processed);

        // Show the first chunk of recipes
        setVisibleRecipes(processed.slice(0, ITEMS_PER_LOAD));

        // If total is less than one page, disable further loading
        if (processed.length <= ITEMS_PER_LOAD) setHasMore(false);
      } catch (err) {
        // Save any error for rendering
        setError(err.message);
      } finally {
        // Hide loading spinner
        setLoading(false);
      }
    };

    fetchRecipes(); // Initial fetch on component mount
  }, []);

  
  // ========== FETCH USER'S SAVED RECIPES ==========

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        // API call to get recipes saved by this user (requires cookie/session)
        const response = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true // important: includes session cookie
        });

        console.log('✅ Saved recipes response:', response.data);

        // Set to an array of saved recipes (likely full or partial recipe objects)
        setSavedRecipes(response.data || []);
      } catch (error) {
        // If request fails, fallback to empty list
        console.error('Error fetching saved recipes:', error);
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipes(); // Initial fetch on component mount
  }, []);

  // ========== SET UP INFINITE SCROLL ==========

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled near the bottom of the page
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && hasMore) {
        loadMore(); // Load more recipes
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up scroll listener when component unmounts or re-renders
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleRecipes, hasMore]);

  // ========== LOAD MORE RECIPES (CHUNKED) ==========

  const loadMore = () => {
    // Grab next N recipes based on current scroll position
    const nextRecipes = allRecipes.slice(visibleRecipes.length, visibleRecipes.length + ITEMS_PER_LOAD);

    // Add to visible list
    setVisibleRecipes(prev => [...prev, ...nextRecipes]);

    // If we've shown all recipes, stop future loading
    if (visibleRecipes.length + ITEMS_PER_LOAD >= allRecipes.length) {
      setHasMore(false);
    }
  };

  // ========== CONDITIONAL RENDERING FOR LOADING/ERROR ==========

  if (loading) return <p className="text-center">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // ========== MAIN RENDER BLOCK ==========

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
      {visibleRecipes.map((recipe) => {
        // Determine if this recipe has been saved/favourited by the user
        const isLiked =
          Array.isArray(savedRecipes) &&
          savedRecipes.some((saved) => {
            return (
              saved.recipe_id === recipe.recipe_id ||     // match if recipe_id
              saved.user_recipe_id === recipe.recipe_id || // match if user_recipe_id
              saved === recipe.recipe_id ||                // match if array of numbers
              saved === String(recipe.recipe_id)           // match if stringified number
            );
          });

        return (
          <div key={recipe.recipe_id} className="w-full max-w-[300px]">
            <RecipeCard
              recipe={recipe}
              initiallyLiked={isLiked}
            />
          </div>

        );
      })}

      {/* Message displayed at the bottom when there are more items being fetched */}
      {hasMore && (
        <p className="text-center col-span-full text-gray-500">Loading more recipes...</p>
      )}
    </div>
  );
}
