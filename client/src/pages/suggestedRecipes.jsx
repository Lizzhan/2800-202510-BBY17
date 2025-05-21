import { useLocation } from 'react-router-dom';
import SuggestedRecipeGallery from '../components/SuggestedRecipeGallery';
/**
 * a recipe gallery used to display recipes that is suggested to the user based on what ingredient was selected. 
 * @author Lucas Liu
 */
export default function SuggestedRecipesPage() {
  //use location and get the location recipe that was passed from the previous page.
  const location = useLocation();
  const recipes = location.state?.recipes;

  //if no recipe then give a good message. 
  if (!recipes) {
    return <p className="text-center text-red-500">No recipes provided. Please go back and try again.</p>;
  }

  //render the gallery.
  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-center mb-4">Suggested Recipes</h1>
      <SuggestedRecipeGallery recipes={recipes} />
    </div>
  );
}
