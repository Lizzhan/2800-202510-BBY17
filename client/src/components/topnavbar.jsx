import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Navbar({onNavigate, onBack}) {
  return (
    <nav className="sticky top-0 z-50 bg-[#65350f] shadow-md p-4 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-white hover:text-blue-600"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <button
        onClick={() => onNavigate('home')}
        className="text-xl font-semibold text-castIron hover:text-blue-600"
      >
        Recipedia
      </button>

      <button
        onClick={() => onNavigate('profile')}
        className="text-castIron hover:text-blue-600"
        aria-label="Profile"
      >
        <UserIcon className="h-6 w-6" />
      </button>
    </nav>
  );
}
