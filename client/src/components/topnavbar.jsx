import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Navbar({onNavigate, onBack}) {
  return (
     
    <nav className="sticky top-0 z-50 bg-navy shadow-md p-4 flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-tiledLight hover:text-juicyOrange"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6"/>
      </button>

      <button
        onClick={() => onNavigate('home')}
        className="text-xl font-bold text-juicyOrange hover:text-juicyOrange"
      >
        Recipedia
      
      </button>

      <button
        onClick={() => onNavigate('profile')}
        className="text-tiledLight hover:text-juicyOrange"
        aria-label="Profile"
      >
        <UserIcon className="h-6 w-6" />
      </button>
    </nav>
  );
}
