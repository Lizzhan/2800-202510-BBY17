import RecipeCard from './recipecard';

export default function SuggestedRecipeGallery({ recipes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {recipes.map((recipe) => (
        <div key={recipe.recipe_id} className="min-w-[16rem]">
          <RecipeCard 
            recipe={{
              ...recipe,
              image: recipe.image || `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.recipe_title)}`
            }}
            initiallyLiked={false}
          />
        </div>
      ))}
    </div>
  );
}
