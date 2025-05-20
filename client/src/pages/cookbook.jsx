import GalleryContainer from '../components/GalleryContainer';
import { Link } from 'react-router-dom';

export default function Cookbook() {
  return (
    <div className="flex flex-col gap-8">
      <br></br>
      <section>
        <h2 className="text-lg font-semibold mb-2">Your Favourite Recipes</h2>
        <GalleryContainer />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Your Uploaded Recipes</h2>
        <GalleryContainer />
      </section>

      <div className="flex justify-center pt-6">
        <Link to="/createRecipe">
          <button className="bg-buttonPeach text-white font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition">
            Write a New Recipe
          </button>
        </Link>
      </div>
      <br></br>
    </div>
  );
}