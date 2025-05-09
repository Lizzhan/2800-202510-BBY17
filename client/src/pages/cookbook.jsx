import GalleryContainer from '../components/GalleryContainer';

export default function cookbook() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Favourite Recipes</h2>
        <GalleryContainer />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Recipes</h2>
        <GalleryContainer />
      </section>
    </div>
  );
}