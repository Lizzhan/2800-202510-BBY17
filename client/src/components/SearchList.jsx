import React from "react";

/**
 * SearchList Component
 *
 * Displays a list of items (e.g., selected ingredients) with optional highlighting
 * and a remove button. Items can be selected/deselected, and removed via a callback.
 *
 * @author
 * 
 * Props:
 * @param {string[]} items - Array of selected item names to display.
 * @param {function} onRemove - Callback to remove an item (passes item's index).
 * @param {Set<string>} highlightedItems - Set of currently highlighted items.
 * @param {function} setHighlightedItems - Function to update highlighted item Set.
 *
 * @returns {JSX.Element} A scrollable list of items with selectable and removable UI.
 */
export default function SearchList({
  items = [],
  onRemove,
  highlightedItems,
  setHighlightedItems
}) {

  /**
   * Toggles an item’s selection highlight state
   * @param {string} item - Item to toggle selection
   */
  const toggleSelection = (item) => {
    if (!highlightedItems || !setHighlightedItems) return;
    const newSet = new Set(highlightedItems);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setHighlightedItems(newSet);
  };

  return (
    // Outer container with scrolling and styling
    <div className="max-h-60 overflow-y-auto border rounded p-2 bg-[#FDF6EC] border-2 border-black">
      {/* Message when no items are present */}
      {items.length === 0 ? (
        <div className="text-gray-500 italic">No ingredients selected.</div>
      ) : (
        // Map through all itmes and render each
        items.map((item, index) => {
          const isHighlighted = highlightedItems instanceof Set && highlightedItems.has(item);
          return (
            // Each item row, clickable for selection toggle
            <div
              key={index}
              onClick={() => toggleSelection(item)}
              className={`flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer transition
                ${isHighlighted ? "bg-[#FDD848] font-medium" : "hover:bg-gray-100"}`}
            >
              {/* Display the item name */}
              <span>{item}</span>

              {/* Remove button (x icon) - does not trigger selection toggle */}
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={(e) => {
                  e.stopPropagation();  // Prevent parent click from toggling selection
                  onRemove(index);      // Remove the item from the list
                }}
              >
                ✕
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
