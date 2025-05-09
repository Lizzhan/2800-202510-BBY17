import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Navbar({onNavigate, onBack}) {
  return (
<<<<<<< HEAD
    <nav className="sticky top-0 z-50 bg-[#65350f] shadow-md p-4 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-white hover:text-blue-600"
=======
    <nav className="sticky top-0 z-50 bg-avocado shadow-md p-4 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-gray-700 hover:text-castIron"
>>>>>>> JamesS_Visuals
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={() => onNavigate('home')}
<<<<<<< HEAD
        className="text-xl font-semibold text-white hover:text-blue-600"
=======
        className="text-xl font-semibold text-castIron hover:text-blue-600"
>>>>>>> JamesS_Visuals
      >
        Recipedia
      </button>

      <button
        onClick={() => onNavigate('profile')}
<<<<<<< HEAD
        className="text-white hover:text-blue-600"
=======
        className="text-castIron hover:text-blue-600"
>>>>>>> JamesS_Visuals
        aria-label="Profile"
      >
        <UserIcon className="h-6 w-6" />
      </button>
    </nav>
  );
}
