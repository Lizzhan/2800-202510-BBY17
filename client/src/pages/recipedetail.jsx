import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false); 

  useEffect(() => {
    fetch(`http://localhost:3000/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        data.image = `https://source.unsplash.com/featured/?${encodeURIComponent(data.recipe_title)}`; 
        setRecipe(data);
      })
      .catch(console.error);
  }, [id]);

  if (!recipe) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">{recipe.recipe_title}</h1>
        <button
          onClick={() => setLiked(!liked)}
          className={`transition-colors duration-300 focus:outline-none ${
            liked ? 'text-buttonPeach' : 'text-[#f8d7da] hover:text-buttonPeach'
          }`}
          aria-label="Like this recipe"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                     4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                     6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <img
        src={recipe.image}
        alt={recipe.recipe_title}
        className="w-full h-64 object-cover rounded-lg shadow"
      />

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{recipe.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Steps</h2>
        <p className="text-gray-700 whitespace-pre-line">{recipe.steps}</p>
      </section>
    </div>
  );
}
