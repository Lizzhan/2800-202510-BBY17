import React, { useState } from "react";

const tags = [
  "Healthy", "Quick", "Comfort", "Vegetarian", "High Protein",
  "Low Carb", "Budget", "Family", "Fancy", "Spicy"
];

export default function FilterTagSection({ onFilterChange }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    const updated =
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

    setSelectedTags(updated);
    onFilterChange(updated); // pass to parent
  };

  return (
    <div className="bg-white rounded p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-3">What are you feeling?</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`border px-3 py-1 rounded-full text-sm transition
              ${
                selectedTags.includes(tag)
                  ? "bg-[#FAA381] text-white border-[#FAA381]"
                  : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
