import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FilterTagSection({ onFilterChange, selectedTags }) {
  const [tags, setTags] = useState([]); // fetched from DB now

  // Fetch tags once when component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/tags/GetTags'); 
        const tagNames = res.data.map(tag => tag.tag); // extract only tag names
        setTags(tagNames);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  const toggleTag = (tag) => {
    const updated =
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

    onFilterChange(updated); // pass to parent
  };

  return (
    <div className="bg-kaidCream rounded p-4 shadow-md border-2 border-black">
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
