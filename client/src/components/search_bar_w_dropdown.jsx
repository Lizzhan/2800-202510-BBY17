import React, { useState } from 'react';

const sampleSuggestions = [
  "Dropdown menu",
  "Dropdown list Excel",
  "Dropdown in Word",
  "Dropdown meaning",
  "Dropdown box",
  "Dropdown UI component",
  "Dropdown ceiling",
  "Dropdown TV mount",
];

function SearchBarWithDropdown({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = sampleSuggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredSuggestions(results);
    setShowSuggestions(true);
  };

  const handleSelect = (value) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    onSearch(value); // pass selected term up
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
