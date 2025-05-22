import React, { useState } from 'react';

/**
 * SearchBar Component
 * 
 * Renders a styled search input with a submit button.
 * Accepts user input and triggers the `onSearch` callback with the current search term
 * whenever the input changes or the form is submitted.
 * 
 * Props:
 * - onSearch (function): Callback to receive the search term as the user types or submits
 * 
 * @author
 * 
 * @returns {JSX.Element} A styled search form with a magnifying glass icon and submit button
 */
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form submission (pressing Enter or clicking Search)
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  // Handle real-time input changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    // Form wrapper for seatch input and button
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Screen-reader only label for accessibility */}
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>

      {/* Container for the input and button */}
      <div className="relative">
        {/* Magnifying glass icon inside input field */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        {/* Search input field */}
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                     focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Ingredients"
          value={searchTerm}
          onChange={handleInputChange}
          required
        />

        {/* Search submit button */}
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 
                     focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;