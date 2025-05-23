import { useState, useRef, useEffect } from 'react';
import { Refrigerator, WandSparkles, CookingPot, Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

/**
 * An expandable footbar component that stays fixed to the bottom of the screen.
 * The design is based on Tailwind CSS with styling inspiration from Flowbite.
 * With help from ChatGPT, functionality was implemented to expand and collapse
 * the bar when clicking inside or outside of it.
 * 
 * @author Lucas Liu
 * @author https://chat.openai.com
 * @author https://flowbite.com
 */
export default function Footbar() {
  // Tracks whether the footbar is currently expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Tracks whether the central '+' button is in a rotating animation state
  const [isRotating, setIsRotating] = useState(false);

  // Controls visibility of the expanded navigation buttons
  const [isVisible, setIsVisible] = useState(false);

  // Ref to the navigation container to detect outside clicks
  const navRef = useRef(null);
  const { isAuthenticated }= useAuth();

  // Adds an event listener that collapses the footbar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsExpanded(false);
        setTimeout(() => setIsVisible(false), 300); // delay to match animation
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggles the visibility and rotation of the '+' button and expands the menu
  const handleToggle = () => {
    if(!isAuthenticated){
      return ;
    }
    setIsRotating(true);
    setTimeout(() => {
      setIsVisible(true);
      setIsExpanded(true);
      setIsRotating(false);
    }, 300); // delay to match animation
  };

  // Return the JSX layout for the footbar
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div ref={navRef} className="relative flex justify-center items-end">

        {/* '+' Button — Shown only when the bar is collapsed */}
        {!isVisible && (
          <button
            onClick={handleToggle}
            className="w-10 h-10 bg-buttonPeach text-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-buttonPeachHover focus:outline-none focus:ring-2 focus:ring-blue-300 z-20 -translate-y-2"
          >
            <Plus
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isRotating ? 'rotate-45' : ''
              }`}
            />
          </button>
        )}

        {/* Navigation Bar — Shown when the '+' button is clicked */}
        {isVisible && (
          <div
            className={`origin-center transition-all duration-300 ease-in-out px-4 transform
              ${isExpanded ? 'w-full opacity-100 scale-y-100' : 'w-0 opacity-0 scale-y-95'}
              max-w-md h-16 bg-sunshineYellow border border-gray-200 rounded-full shadow-md dark:bg-gray-700 dark:border-gray-600 overflow-hidden flex items-center justify-between`}
          >
            <div className="flex w-full h-full items-center">

              {/* Left: Fridge Icon — Collapses the menu on click */}
              <Link to="/fridge" className="flex-1">
                <div
                  onClick={() => {
                    setIsExpanded(false);
                    setTimeout(() => setIsVisible(false), 300);
                  }}
                  className="w-full h-full flex flex-col items-center justify-center p-2 rounded-full hover:bg-buttonPeachHover dark:hover:bg-gray-800"
                >
                  <Refrigerator className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span className="sr-only">Fridge</span>
                </div>
              </Link>

              {/* Center: Suggest Icon — Always active; stays in place */}
              <Link to="/suggest" className="mx-2">
                <button
                  type="button"
                  className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-buttonPeach focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <WandSparkles className="w-5 h-5" />
                  <span className="sr-only">New item</span>
                </button>
              </Link>

              {/* Right: Cookbook Icon — Collapses the menu on click */}
              <Link to="/cookbook" className="flex-1">
                <div
                  onClick={() => {
                    setIsExpanded(false);
                    setTimeout(() => setIsVisible(false), 300);
                  }}
                  className="w-full h-full flex flex-col items-center justify-center p-2 rounded-full hover:bg-buttonPeach dark:hover:bg-gray-800"
                >
                  <CookingPot className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span className="sr-only">Cookbook</span>
                </div>
              </Link>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
