import GalleryContainer from '../components/SavedRecipeGalleryContainer';
import { Link } from 'react-router-dom';

/**
 * The Cookbook page displays two horizontally scrollable recipe galleries:
 * one for the user's favorited recipes and one for their own uploaded recipes.
 * 
 * This component layout is based on examples from React documentation and follows
 * a clean section-based structure using Tailwind CSS for styling.
 *
 * @author Lucas Liu
 * @author James Smith
 * @author https://chat.openai.com
 */
export default function Cookbook() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <br></br>
      {/* Section to display favorited recipes */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Favourite Recipes</h2>
        <GalleryContainer showSavedOnly={true} />
      </section>

      {/* Section to display user-uploaded recipes */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Recipes</h2>
        <GalleryContainer uploadedOnly={true} />
      </section>

      {/* Button to allow users to write their own recipes */}
      <div className="flex justify-center pt-6">
        <Link to="/createRecipe">
          <button className="bg-buttonPeach text-black font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition">
            Write a New Recipe
          </button>
        </Link>
      </div>
      <br></br>
    </div>
  );
}
