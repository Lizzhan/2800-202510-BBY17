import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * SearchBarWithDropdown Component
 * 
 * A dynamic ingredient search bar with auto-suggest dropdown, powered by live ingredient data from a backend API.
 * Features:
 * - Fetches ingredient list from backend once on mount
 * - Filters suggestions as user types
 * - Resets input and suggestions when `resetTrigger` changes (used by parent)
 * - Allows selection from dropdown or manual search
 * part of the code was complete with the help of chatGPT 4
 * 
 * @param {function} onSearch - Callback function to handle selected search term
 * @param {any} resetTrigger - When changed, resets input and suggestion list
 * 
 * @author Kaid Krawchuk
 * @author https://chat.openai.com
 */
function SearchBarWithDropdown({ onSearch, resetTrigger }) {
  // Stores the current user input in the search box
  const [searchTerm, setSearchTerm] = useState('');

  // Holds all possible ingredient suggestions (fetched once from backend)
  const [suggestions, setSuggestions] = useState([]);

  // Stores filtered results based on what the user types
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Controls visibility of the dropdown suggestion list
  const [showSuggestions, setShowSuggestions] = useState(false);

  /**
   * useEffect: Fetch ingredient data from backend when component mounts
   * Endpoint should return a list of ingredient objects
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/ingredients/getingredients');
        // Extract ingredient names only (e.g. from [{ ingredient: "apple" }, ...])
        const ingredientNames = res.data.map(item => item.ingredient);
        setSuggestions(ingredientNames); // Store for filtering
      } catch (err) {
        console.error('Error fetching ingredients:', err);
      }
    };

    fetchData();
  }, []);

  /**
   * useEffect: Reset input and suggestions when resetTrigger changes
   * Useful for parent-controlled clearing after a search
   */
  useEffect(() => {
    setSearchTerm('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  }, [resetTrigger]);

  /**
   * Handles user input in the search field
   * - Updates input state
   * - Filters suggestion list
   * - Shows dropdown if input is not empty
   */
  const handleChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // If input is empty, close dropdown and clear suggestions
    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Filter suggestions based on input (case-insensitive substring match)
    const results = suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredSuggestions(results);
    setShowSuggestions(true); // Show dropdown
  };

  /**
   * Handles selection of a suggestion from dropdown
   * - Fills input box with selected value
   * - Closes dropdown
   * - Triggers search callback with selected item
   */
  const handleSelect = (value) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    onSearch(value); // Notify parent
  };

  /**
   * Handles form submit (e.g. when user presses Enter)
   * - Triggers search callback with current input value
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setShowSuggestions(false); // Hide suggestions
    onSearch(searchTerm); // Send term to parent
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* Search input field with form wrapper to support Enter key */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                     focus:ring-blue-500 focus:border-blue-500"
        />
      </form>

      {/* Conditional rendering of filtered suggestions in dropdown list */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBarWithDropdown;
