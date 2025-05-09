import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#652A0E] shadow-md p-4 flex items-center justify-between">
      <button
        onClick={() => window.history.back()}
        className="text-gray-700 hover:text-blue-600"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6 text-black" />
      </button>

      <a
        href="/"
        className="text-xl font-semibold text-white hover:text-blue-600"
      >
        Recipedia
      </a>

      <button
        onClick={() => alert('Go to profile')}
        className="text-black hover:text-blue-600"
        aria-label="Profile"
      >
        <UserIcon className="h-6 w-6" />
      </button>
    </nav>
  );
}