import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    // You can customize this function to actually log the user out
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FDD848] shadow-md p-4 flex items-center justify-between">
      
      {/* Left: Back Button */}
      <button
        onClick={handleBack}
        className="text-black hover:text-blue-600"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      {/* Center: Logo */}
      <Link
        to="/"
        className="text-xl font-semibold text-castIron hover:text-blue-600"
      >
        Recipedia
      </Link>

      {/* Right: Home, Logout, Profile */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-castIron hover:text-blue-600 font-medium"
        >
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="text-castIron hover:text-blue-600 font-medium"
        >
          Logout
        </button>
        <Link to="/profile" aria-label="Profile">
          <UserIcon className="h-6 w-6 text-castIron hover:text-blue-600" />
        </Link>
      </div>
    </nav>
  );
}
