import React, { useState } from 'react';

const sampleSuggestions = [
"Milk",
"Eggs",
"Ribeye Steak",
"Salmon",
"Broccoli",
"Spinach",
"Chicken Breast",
"Tomatoes",
"Cheddar Cheese",
"Avocado",
"Garlic",
"Onions",
"Bell Peppers",
"Potatoes",
"Mushrooms",
"Ground Beef",
"Zucchini",
"Carrots",
"Pasta",
"Basil",
"Olive Oil",
"Vegetable Oil",
"Balsamic Vinegar",
"Apple Cider Vinegar",
"Soy Sauce",
"Salt",
"Black Pepper",
"Garlic Powder",
"Onion Powder",
"Paprika",
"Cumin",
"Oregano",
"Basil",
"Thyme",
"Cinnamon",
"Sugar",
"Brown Sugar",
"All-Purpose Flour",
"Rice",
"Pasta"

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
