import RecipeCardGallery from '../components/recipecardgallery';
import UserLocation from '../components/UserLocation';

export default function home() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome back!</h1>
      <UserLocation />
      <h1 className="text-2xl font-semibold text-gray-800">
        Weekly Featured Recipes
      </h1>
      <RecipeCardGallery />
    </div>
  );
}