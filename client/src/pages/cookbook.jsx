import GalleryContainer from '../components/SavedRecipeGalleryContainer';

/**
 * cook book page that displays the two container that holds two horizontal scroll gallery. code
 * was produced by studying the react documentation.
 * @author Lucas Liu
 */
export default function Cookbook() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Favourite Recipes</h2>
        <GalleryContainer showSavedOnly={true} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Recipes</h2>
        <GalleryContainer uploadedOnly={true} />
      </section>
    </div>
  );
}
