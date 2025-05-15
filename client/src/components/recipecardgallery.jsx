// import { useEffect, useState } from 'react'; 
// import RecipeCard from './recipecard';

// export default function RecipeCardGallery() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/recipes');
//         if (!response.ok) {
//           throw new Error('Failed to fetch recipes');
//         }
//         const data = await response.json();

//         // const processed = data.map(recipe => ({
//         //   title: recipe.recipe_title,
//         //   description: recipe.description,
//         //   image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
//         // }));

//         const processed = data.map(recipe => ({
//           recipe_id: recipe.recipe_id,
//           recipe_title: recipe.recipe_title,
//           description: recipe.description,
//           image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
//         }));

//         setRecipes(processed);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) return <p className="text-center">Loading recipes...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
//       {/* {recipes.map((recipe, idx) => (
//         <div key={idx} className="min-w-[16rem]">
//           <RecipeCard 
//             title={recipe.title} 
//             image={recipe.image} 
//             description={recipe.description}
//           />
//         </div>
//       ))} */
//       recipes.map((recipe) => (
//         <div key={recipe.recipe_id} className="min-w-[16rem]">
//           <RecipeCard recipe={recipe} />
//         </div>
//       ))}

      
//     </div>
//   );
// }

import { useEffect, useState } from 'react'; 
import RecipeCard from './recipecard';

export default function RecipeCardGallery() {
  const [allRecipes, setAllRecipes] = useState([]);      // All recipes from backend
  const [visibleRecipes, setVisibleRecipes] = useState([]); // Recipes currently shown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);          // Track if more recipes to show
  const ITEMS_PER_LOAD = 10;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();

        const processed = data.map(recipe => ({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          description: recipe.description,
          image: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
        }));

        setAllRecipes(processed);
        setVisibleRecipes(processed.slice(0, ITEMS_PER_LOAD));
        if (processed.length <= ITEMS_PER_LOAD) {
          setHasMore(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Infinite scroll logic
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {visibleRecipes.map((recipe) => (
        <div key={recipe.recipe_id} className="min-w-[16rem]">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      {hasMore && <p className="text-center col-span-2 text-gray-500">Loading more recipes...</p>}
    </div>
  );
}
