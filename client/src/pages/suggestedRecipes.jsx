import { useLocation } from 'react-router-dom';
import SuggestedRecipeGallery from '../components/SuggestedRecipeGallery';

/**
 * A recipe gallery page that displays AI-suggested recipes based on
 * the user's selected ingredients. Recipes are passed via navigation state
 * from a previous page (e.g., fridge or suggestion trigger).
 *
 * @returns {JSX.Element} A list of suggested recipes in a responsive gallery layout.
 *
 * @author Lucas Liu
 */
export default function SuggestedRecipesPage() {
  // Use React Router's location object to access state passed during navigation
  const location = useLocation();
  const recipes = location.state?.recipes;

  // If no recipes were passed, display a fallback message
  if (!recipes) {
    return (
      <p className="text-center text-red-500">
        No recipes provided. Please go back and try again.
      </p>
    );
  }

  // Render the suggested recipe gallery
  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-center mb-4">Suggested Recipes</h1>
      <SuggestedRecipeGallery recipes={recipes} />
    </div>
  );
}
