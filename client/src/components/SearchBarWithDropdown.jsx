import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBarWithDropdown({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Fetched from DB
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch ingredients once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/ingredients/getingredients');
        console.log(res);
        const ingredientNames = res.data.map(item => item.ingredient); // important!
        setSuggestions(ingredientNames);
      } catch (err) {
        console.error('Error fetching ingredients:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // 🔥 filter using dynamic suggestions, not hardcoded list
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
    <div className="relative max-w-md mx-auto">
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

      {/* Dropdown suggestions */}
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
