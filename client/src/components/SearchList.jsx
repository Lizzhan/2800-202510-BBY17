import React from "react";

export default function SearchList({
  items = [],
  onRemove,
  highlightedItems,
  setHighlightedItems
}) {
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
    <div className="max-h-60 overflow-y-auto border rounded p-2 bg-[#FDF6EC] border-2 border-black">
      {items.length === 0 ? (
        <div className="text-gray-500 italic">No ingredients selected.</div>
      ) : (
        items.map((item, index) => {
          const isHighlighted = highlightedItems instanceof Set && highlightedItems.has(item);
          return (
            <div
              key={index}
              onClick={() => toggleSelection(item)}
              className={`flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer transition
                ${isHighlighted ? "bg-[#FDD848] font-medium" : "hover:bg-gray-100"}`}
            >
              <span>{item}</span>
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
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
