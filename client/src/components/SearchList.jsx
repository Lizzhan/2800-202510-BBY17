import React, { useState, useEffect } from "react";

export default function SearchList({ items, onRemove }) {
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Reset selection when items change
  useEffect(() => {
    setSelectedItems(new Set());
  }, [items]);

  const toggleSelection = (item) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }
    setSelectedItems(newSet);
  };

  return (
    <div className="max-h-60 overflow-y-auto border rounded p-2 bg-white">
      {items.length === 0 ? (
        <div className="text-gray-500 italic">No ingredients selected.</div>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleSelection(item)}
            className={`flex justify-between items-center p-2 border-b last:border-b-0 cursor-pointer transition
              ${selectedItems.has(item) ? "bg-[#6BCA50] font-medium" : "hover:bg-gray-100"}`}
          >
            <span>{item}</span>
            <button
              className="text-red-500 hover:text-red-700 ml-4"
              onClick={(e) => {
                e.stopPropagation(); // don't trigger selection toggle
                onRemove(index);
              }}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}
