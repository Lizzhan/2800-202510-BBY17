import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated }= useAuth();
  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  }
  return (
    <nav className="sticky top-0 z-50 bg-[#65350f] shadow-md p-4 flex items-center justify-between">
      <button
        onClick = {handleBack}
        className="text-white hover:text-blue-600"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <button
        className="text-xl font-semibold text-castIron hover:text-blue-600"
      >
        <Link to="/">Recipedia</Link>
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
        <UserIcon className="h-6 w-6" />
      </button>
    </nav>
  );
}
