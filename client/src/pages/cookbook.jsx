import GalleryContainer from '../components/SavedRecipeGalleryContainer';

/**
 * The Cookbook page displays two horizontally scrollable recipe galleries:
 * one for the user's favorited recipes and one for their own uploaded recipes.
 * 
 * This component layout is based on examples from React documentation and follows
 * a clean section-based structure using Tailwind CSS for styling.
 *
 * @author Lucas Liu
 */
export default function Cookbook() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Section for favorited recipes */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Favourite Recipes</h2>
        <GalleryContainer showSavedOnly={true} />
      </section>

      {/* Section for user-uploaded recipes */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Recipes</h2>
        <GalleryContainer uploadedOnly={true} />
      </section>
    </div>
  );
}
