import { Refrigerator,ChefHat,CookingPot } from 'lucide-react';

export default function Footbar({onNavigate}) {
  return (
    <div className="fixed z-50 w-full h-16 max-w-md -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 shadow-md dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full grid-cols-3 items-center px-4">
        {/* Left: Home */}
        <button
          type="button"
          onClick={() => onNavigate('fridge')}
          className="flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
        >
          <Refrigerator className="w-6 h-6 text-gray-600 hover:text-blue-600 dark:text-gray-300" />
          <span className="sr-only">Fridge</span>
        </button>

        {/* Center: Add New */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <ChefHat className="w-5 h-5" />
            <span className="sr-only">New item</span>
          </button>
        </div>

        {/* Right: Profile */}
        <button
          type="button"
          onClick={() => onNavigate('cookbook')}
          className="flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
        >
          <CookingPot className="w-6 h-6 text-gray-600 group-hover:text-blue-600 dark:text-gray-300" />
          <span className="sr-only">Profile</span>
        </button>
      </div>
    </div>
  );
}
