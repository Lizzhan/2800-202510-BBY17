import React from "react";

/**
 * IngredientModal Component
 *
 * A modern, centered modal for selecting where to add an ingredient.
 * Offers options for Pantry, Fridge, or Cancel, with enhanced styling.
 *
 * @author Kaid Krawchuk
 * @author https://chat.openai.com
 */
export default function IngredientModal({ ingredient, onClose, onAddToPantry, onAddToFridge }) {
  if (!ingredient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add <span className="text- font-bold">"{ingredient}"</span>
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onAddToPantry(ingredient)}
            className="px-6 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow"
          >
            Add to Pantry
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onAddToFridge(ingredient)}
            className="px-6 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition shadow"
          >
            Add to Fridge
          </button>
        </div>
      </div>
    </div>
  );
}
