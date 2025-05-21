import { useState, useRef, useEffect } from 'react';
import { Refrigerator, WandSparkles, CookingPot, Plus } from 'lucide-react';
import { Link } from "react-router-dom";
/** 
  * an expanding footbar thats is always stickingg to the bottomethe design of the foot bar is found from tailwind 
  * w8ith the help of chatgpt i was able to create the funciton that expands and contract when clicked else where
  * @author Lucas Liu
  * @author https://chat.openai.com//
  * @author https://flowbite.com
*/
export default function Footbar() {
  //the state used for set the state of the footbar if it is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  //the state used to set if the button is currently rotating
  const [isRotating, setIsRotating] = useState(false);
  //state  used to set if the button or the footbar is visible
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);

  //when the footbar is expanded and open when clicking else where it shrinks the footbar back to a button
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

  //when button is clicked set up the rotating animation of the button
  const handleToggle = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsVisible(true);
      setIsExpanded(true);
      setIsRotating(false);
    }, 300);
  };

  //returning the react componnent of the footbar
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

        {/* Nav bar */}
        {isVisible && (
          <div
            className={`origin-center transition-all duration-300 ease-in-out px-4 transform
              ${isExpanded ? 'w-full opacity-100 scale-y-100' : 'w-0 opacity-0 scale-y-95'}
              max-w-md h-16 bg-sunshineYellow border border-gray-200 rounded-full shadow-md dark:bg-gray-700 dark:border-gray-600 overflow-hidden flex items-center justify-between`}
          >
            <div className="flex w-full h-full items-center">

              {/* Left: Fridge */}
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

              {/* Center: Suggest*/}
              <Link to="/suggest" className="mx-2">
                <button
                  type="button"
                  className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-buttonPeach focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <WandSparkles className="w-5 h-5" />
                  <span className="sr-only">New item</span>
                </button>
              </Link>

              {/* Right: Cookbook */}
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
