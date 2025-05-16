import GalleryContainer from '../components/SavedRecipeGalleryContainer';

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
