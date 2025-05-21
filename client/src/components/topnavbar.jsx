import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from 'axios'

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated }= useAuth();
  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  const handleLogout = async () => {
  try {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <nav className="sticky top-0 z-50 bg-[#FDD848] shadow-md px-4 py-3">
  <div className="flex items-center justify-between relative">
    
    {/* Left: Back Button */}
    <div className="flex items-center min-w-[2.5rem] sm:min-w-[3rem]">
      <button
        onClick={handleBack}
        className="text-black hover:text-blue-600"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>
    </div>

    {/* Center: Title*/}
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link
        to="/"
        className="font-lora text-2xl sm:text-3xl font-bold tracking-wide text-castIron drop-shadow-sm"
      >
        Recipedia
      </Link>
    </div>

    {/* Right: Home / Logout / Profile */}
    <div className="flex items-center justify-end min-w-[6.5rem] space-x-1 sm:space-x-3">
      <Link
        to="/"
        className="bg-buttonPeach text-castIron font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow hover:bg-buttonPeachHover transition text-xs sm:text-base"
      >
        Home
      </Link>
        <button
        onClick={handleLogout}
        className="bg-buttonPeach text-castIron font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow hover:bg-buttonPeachHover transition text-xs sm:text-base"
      >
        Logout
        </button>

        <button
        className="text-castIron hover:text-blue-600"
        aria-label="Profile"
        onClick={() => {
          if (isAuthenticated) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
      >
      <Link to="/profile" aria-label="Profile">
        <UserIcon className="h-6 w-6 text-castIron hover:text-blue-600" />
      </Link>
      </button>

    </div>
  </div>
</nav>

  );

}
