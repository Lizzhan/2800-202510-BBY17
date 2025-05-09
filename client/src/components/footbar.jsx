import { HomeIcon, UserIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function Footbar({onNavigate}) {
  return (
    <div className="fixed z-50 w-full h-16 max-w-md -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 shadow-md dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full grid-cols-3 items-center px-4">
        {/* Left: Home */}
        <button
          type="button"
          className="flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
        >
<<<<<<< HEAD
          <HomeIcon className="w-5 h-6 text-gray-600 group-hover:text-blue-600 dark:text-gray-300" />
=======
          <HomeIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 dark:text-gray-300" />
>>>>>>> lucas_liu_scrollable_gallery
          <span className="sr-only">Home</span>
        </button>

        {/* Center: Add New */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="sr-only">New item</span>
          </button>
        </div>

        {/* Right: Profile */}
        <button
          type="button"
          className="flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
        >
          <UserIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 dark:text-gray-300" />
          <span className="sr-only">Profile</span>
        </button>
      </div>
    </div>
  );
}
