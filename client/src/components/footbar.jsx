import { useState, useRef, useEffect } from 'react';
import { Refrigerator, ChefHat, CookingPot, Plus } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Footbar() {
  // { onNavigate }
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsExpanded(false);
        setTimeout(() => setIsVisible(false), 300);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsVisible(true);
      setIsExpanded(true);
      setIsRotating(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div ref={navRef} className="relative flex justify-center items-end">

        {/* + Button */}
        {!isVisible && (
          <button
            onClick={handleToggle}
            className="w-10 h-10 bg-sunshineYellow text-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-300 z-20 -translate-y-2"
          >
              <Plus
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isRotating ? 'rotate-45' : ''
                }`}
              />

          </button>
        )}

        {/* Nav bar with curtain-fold animation */}
        {isVisible && (
          <div
              className={`origin-center transition-all duration-300 ease-in-out px-4 transform
                ${isExpanded ? 'w-full opacity-100 scale-y-100' : 'w-0 opacity-0 scale-y-95'}
                max-w-md h-16 bg-sunshineYellow border border-gray-200 rounded-full shadow-md dark:bg-gray-700 dark:border-gray-600 overflow-hidden flex items-center justify-between`}
            >
              <div className="flex justify-evenly items-center w-full h-full">
                {/* Left: Fridge */}
                <Link to="/fridge">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setTimeout(() => setIsVisible(false), 300);
                    }}
                    className="flex flex-col items-center justify-center hover:bg-buttonPeachHover dark:hover:bg-gray-800 p-2 rounded-full"
                  >
                    <Refrigerator className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    <span className="sr-only">Fridge</span>
                  </button>
                </Link>

                {/* Center: Add New */}
                <Link to="/add">
                  <button
                    type="button"
                    className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-buttonPeach focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <ChefHat className="w-5 h-5" />
                    <span className="sr-only">New item</span>
                  </button>
                </Link>

                {/* Right: Cookbook */}
                <Link to="/cookbook">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setTimeout(() => setIsVisible(false), 300);
                    }}
                    className="flex flex-col items-center justify-center hover:bg-buttonPeach dark:hover:bg-gray-800 p-2 rounded-full"
                  >
                    <CookingPot className="w-6 h-6 text-gray-600 group-hover:text-blue-600 dark:text-gray-300" />
                    <span className="sr-only">Cookbook</span>
                  </button>
                </Link>
              </div>
            </div>

        )}
      </div>
    </div>
  );
}
