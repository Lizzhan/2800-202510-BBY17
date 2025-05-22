import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * SearchBarWithDropdown Component
 * 
 * A dynamic ingredient search bar with auto-suggest dropdown, powered by live ingredient data from a backend API.
 * - Fetches ingredient list on mount
 * - Filters suggestions as user types
 * - Scrollable dropdown (max 6 visible)
 * - Handles manual and suggestion-based search
 *
 * @param {function} onSearch - Callback to handle selected search term
 * @param {any} resetTrigger - When changed, resets input and suggestions
 * 
 * @author Kaid Krawchuk
 * @author https://chat.openai.com
 */
function SearchBarWithDropdown({ onSearch, resetTrigger, centered = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch ingredient names once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/ingredients/getingredients');
        const ingredientNames = res.data.map(item => item.ingredient);
        setSuggestions(ingredientNames);
      } catch (err) {
        console.error('Error fetching ingredients:', err);
      }
    };

    fetchData();
  }, []);

  // Reset input/suggestions when trigger changes
  useEffect(() => {
    setSearchTerm('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  }, [resetTrigger]);

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredSuggestions(results);
    setShowSuggestions(true);
  };

  const handleSelect = (value) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(searchTerm);
  };

  return (
    <div className={`relative ${centered ? 'max-w-md mx-auto' : 'w-full'}`}>
      {/* Search input field */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Ingredients"
          className="w-full p-4 ps-10 text-sm text-gray-900 border-2 border-black rounded-lg bg-gray-50 
                     focus:ring-blue-500 focus:border-blue-500"
        />
      </form>

      {/* Suggestion dropdown (scrollable) */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg 
                       max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
