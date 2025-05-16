import { useState, useEffect } from 'react';
import RecipeCard from './recipecard';
import axios from 'axios';

export default function RecipeCardGallery() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_LOAD = 10;

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();

        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description || '',
          image: recipe.image || `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
        }));

        setAllRecipes(processed);
        setVisibleRecipes(processed.slice(0, ITEMS_PER_LOAD));
        if (processed.length <= ITEMS_PER_LOAD) setHasMore(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Fetch user's saved recipes
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/saved-recipes', {
          withCredentials: true
        });
        console.log('✅ Saved recipes response:', response.data);
        setSavedRecipes(response.data || []);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        setSavedRecipes([]);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && hasMore) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleRecipes, hasMore]);

  const loadMore = () => {
    const nextRecipes = allRecipes.slice(visibleRecipes.length, visibleRecipes.length + ITEMS_PER_LOAD);
    setVisibleRecipes(prev => [...prev, ...nextRecipes]);

    if (visibleRecipes.length + ITEMS_PER_LOAD >= allRecipes.length) {
      setHasMore(false);
    }
  };

  if (loading) return <p className="text-center">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {visibleRecipes.map((recipe) => {
        const isLiked =
          Array.isArray(savedRecipes) &&
          savedRecipes.some((saved) => {
            // Handles both [{ recipe_id: 1 }] and [1, 2, 3]
            return (
              saved.recipe_id === recipe.recipe_id ||
              saved.user_recipe_id === recipe.recipe_id ||
              saved === recipe.recipe_id ||
              saved === String(recipe.recipe_id)
            );
          });

        console.log('Comparing recipe:', recipe.recipe_id, '→ liked?', isLiked);

        return (
          <div key={recipe.recipe_id}>
            <RecipeCard
              recipe={recipe}
              initiallyLiked={isLiked}
            />
          </div>
        );
      })}
      {hasMore && <p className="text-center col-span-full text-gray-500">Loading more recipes...</p>}
    </div>
  );
}
