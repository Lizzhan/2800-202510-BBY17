import { useState } from 'react';

export default function RecipeDetail({ recipe, currentUserId }) {
  const isOwner = recipe.ownerId === currentUserId;
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    imageUrl: recipe.imageUrl || '', // Optional
  });

  const handleChange = (field, value) => {
    setEditableData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log('Saved data:', editableData); // mock save
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Image */}
      <div className="w-full h-64 bg-gray-200 rounded overflow-hidden shadow-sm flex items-center justify-center">
        {editableData.imageUrl ? (
          <img
            src={editableData.imageUrl}
            alt="Recipe"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500 text-lg">No Image Available</span>
        )}
      </div>

      {/* Title */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            className="text-2xl font-bold w-full border border-gray-300 rounded px-2 py-1"
            value={editableData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-semibold">{editableData.title}</h1>
        )}
        {isOwner && (
          <button
            onClick={toggleEdit}
            className="ml-3 px-3 py-1 text-sm font-medium bg-black text-white rounded hover:bg-gray-800"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        )}
      </div>

      {/* Ingredients */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ingredients</h2>
        </div>
        {isEditing ? (
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            value={editableData.ingredients}
            onChange={(e) => handleChange('ingredients', e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap text-gray-800">{editableData.ingredients}</p>
        )}
      </div>

      {/* Steps */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Steps</h2>
        </div>
        {isEditing ? (
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            rows={6}
            value={editableData.steps}
            onChange={(e) => handleChange('steps', e.target.value)}
          />
        ) : (
          <p className="whitespace-pre-wrap text-gray-800">{editableData.steps}</p>
        )}
      </div>
    </div>
  );
}
