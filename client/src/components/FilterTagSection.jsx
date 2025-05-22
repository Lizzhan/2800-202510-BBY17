import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * FilterTagSection Component
 * 
 * Displays a list of tags as buttons which users can toggle to filter recipes.
 * The list of tags is fetched from the backend on mount. Selected tags are highlighted.
 * Clicking a tag updates the `selectedTags` state via the `onFilterChange` callback.
 * 
 * Props:
 * - onFilterChange (function): Callback triggered when the selected tags change
 * - selectedTags (array): List of currently selected tags
 * 
 * @author
 * 
 * @returns {JSX.Element} A styled section with toggleable tag buttons for filtering
 */
export default function FilterTagSection({ onFilterChange, selectedTags }) {
  const [tags, setTags] = useState([]); // fetched from DB now

  // Fetch available tags from the database on first render
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/tags/GetTags'); 
        const tagNames = res.data.map(tag => tag.tag); // extract only tag names
        setTags(tagNames);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  /**
   * Toggle tag selection.
   * If tag is selected, remove it. Otherwise, add it.
   * Updates the parent component through onFilterChange().
   */
  const toggleTag = (tag) => {
    const updated =
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

    onFilterChange(updated); // Notify parent of new selection
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
