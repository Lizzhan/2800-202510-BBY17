import { HomeIcon, UserIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function Footbar({onNavigate}) {
  return (
    <div className="fixed z-50 w-full h-16 max-w-md -translate-x-1/2 bg-navy border border-gray-200 rounded-full bottom-4 left-1/2 shadow-md dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full grid-cols-3 items-center px-4">

        {/* Left: Home */}
        <button
          type="button"
          className="flex flex-col items-center justify-center hover:bg-castIron dark:hover:bg-gray-800 p-2 rounded-full"
        >
          <HomeIcon className="w-6 h-6 text-tiledLight group-hover:text-green-600 dark:text-gray-300" />
          <span className="sr-only">Home</span>
        </button>

        {/* Center: Add New */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="w-10 h-10 bg-juicyOrange text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="sr-only">New item</span>
          </button>
        </div>

        {/* Right: Profile */}
        <button
          type="button"
          className="flex flex-col items-center justify-center hover:bg-castIron dark:hover:bg-gray-800 p-2 rounded-full"
        >
          <UserIcon className="w-6 h-6 text-tiledLight group-hover:text-blue-600 dark:text-gray-800" />
          <span className="sr-only">Profile</span>
        </button>
      </div>
    </div>
  );
}
