import { useLocation } from 'react-router-dom';
import SuggestedRecipeGallery from '../components/SuggestedRecipeGallery';

export default function SuggestedRecipesPage() {
  const location = useLocation();
  const recipes = location.state?.recipes;

  if (!recipes) {
    return <p className="text-center text-red-500">No recipes provided. Please go back and try again.</p>;
  }

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-center mb-4">Suggested Recipes</h1>
      <SuggestedRecipeGallery recipes={recipes} />
    </div>
  );
}
