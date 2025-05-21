import React from 'react';

/**
 * A lightweight warning modal similar to SweetAlert, used to alert users
 * when they try to add an ingredient that is already in their fridge or pantry.
 * The styling is simple and centers the modal on the screen with a dark overlay.
 *
 * The implementation was inspired by Kaid's modal code.
 *
 * @author Lucas Liu
 * @author Kaid Krawchuk
 */
export default function WarningModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm text-center space-y-4">
        <h2 className="text-xl font-bold text-red-600">⚠️ Warning</h2>
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
