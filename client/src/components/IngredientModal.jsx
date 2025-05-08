import React from "react";

export default function IngredientModal({ ingredient, onClose, onAddToPantry, onAddToFridge }) {
  if (!ingredient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center w-96">
        <h2 className="text-xl font-semibold mb-4">Add "{ingredient}"</h2>
        <div className="flex justify-around mt-4">
          <button
            onClick={() => onAddToPantry(ingredient)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Add to Pantry
          </button>
          <button
            onClick={() => onClose()}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onAddToFridge(ingredient)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Add to Fridge
          </button>
        </div>
      </div>
    </div>
  );
}
