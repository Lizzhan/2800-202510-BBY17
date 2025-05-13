import RecipeDetail from './RecipeDetail';

export default function TestRecipePage() {
  const currentUserId = 'abc123';

  const myRecipe = {
    ownerId: 'abc123',
    title: 'Avocado Toast',
    ingredients: 'Bread\nAvocado\nSalt\nChili flakes',
    steps: '1. Toast bread\n2. Mash avocado\n3. Spread and season',
    imageUrl: 'https://via.placeholder.com/600x400.png?text=Avocado+Toast',
  };

  const otherRecipe = {
    ownerId: 'xyz999',
    title: 'Spaghetti Bolognese',
    ingredients: 'Spaghetti\nGround beef\nTomato sauce\nOnions\nGarlic',
    steps: '1. Cook spaghetti\n2. Prepare sauce\n3. Combine and serve',
    imageUrl: '', // No image — will show the "No Image Available" placeholder
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 space-y-12">
      {/* Editable Recipe */}
      <div className="border-b pb-8">
        <h2 className="text-center text-2xl font-bold mb-4">My Recipe (Editable)</h2>
        <RecipeDetail recipe={myRecipe} currentUserId={currentUserId} />
      </div>

      {/* Read-Only Recipe */}
      <div>
        <h2 className="text-center text-2xl font-bold mb-4">Other User's Recipe (Read-Only)</h2>
        <RecipeDetail recipe={otherRecipe} currentUserId={currentUserId} />
      </div>
    </div>
  );
}
