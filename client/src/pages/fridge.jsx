/**
 * Fridge Page Component
 *
 * This page allows authenticated users to manage their kitchen inventory by:
 * - Viewing and organizing ingredients between "Pantry" and "Fridge"
 * - Searching and adding new ingredients via a modal interface
 * - Highlighting ingredients to use in recipe matching
 * - Removing ingredients from either section
 * - Filtering with tags and requesting recipe suggestions
 *
 * It uses React state and effect hooks to interact with a backend API,
 * store ingredient data, and navigate to a recipe results page.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onNavigate] - Optional handler for external navigation
 *
 * @returns {JSX.Element} A full-page UI for managing ingredients and suggesting recipes
 *
 * @dependencies
 * - SearchBarWithDropdown
 * - SearchList
 * - FilterTagSection
 * - PrimaryButton
 * - IngredientModal
 * - WarningModal
 *
 * @author Lucas Liu
 * @author Kaid Krawchuk
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing custom components
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import SearchList from '../components/SearchList';
import FilterTagSection from '../components/FilterTagSection';
import PrimaryButton from '../components/PrimaryButton';
import IngredientModal from '../components/IngredientModal';
import WarningModal from '../components/WarningMotal';

export default function Fridge({ onNavigate }) {
  const navigate = useNavigate();

  // === STATE VARIABLES ===

  // Lists of pantry and fridge ingredients
  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);

  // Modal control for selecting an ingredient to add
  const [modalIngredient, setModalIngredient] = useState(null);

  // Tags selected by user for filtering
  const [selectedTags, setSelectedTags] = useState([]);

  // Error or info message shown in a modal
  const [warningMessage, setWarningMessage] = useState('');

  // Highlighted items (used for selecting items to match recipes)
  const [highlightedPantry, setHighlightedPantry] = useState(new Set());
  const [highlightedFridge, setHighlightedFridge] = useState(new Set());

  // === LOAD USER'S PANTRY & FRIDGE ITEMS ON PAGE LOAD ===
  useEffect(() => {
    const fetchFridgeData = async () => {
      try {
        const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/me', {
          credentials: 'include',
        });
        const userData = await userRes.json();

        const fridgeRes = await fetch(`https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/fridge/${userData.id}`, {
          credentials: 'include',
        });
        const data = await fridgeRes.json();

        // Separate pantry and fridge items based on 'in_pantry' flag
        const pantryItems = data.filter(i => String(i.in_pantry) === '1').map(i => i.ingredient);
        const fridgeItems = data.filter(i => String(i.in_pantry) === '0').map(i => i.ingredient);

        setSelectedPantryItems(pantryItems);
        setSelectedFridgeItems(fridgeItems);
      } catch (err) {
        console.error('Error loading fridge data:', err);
      }
    };

    fetchFridgeData();
  }, []);

  // === MODAL CONTROL ===

  const openModalForItem = (item) => setModalIngredient(item);
  const closeModal = () => setModalIngredient(null);

  // === ADD TO PANTRY ===
  const handleAddToPantry = async (item) => {
    if (selectedPantryItems.includes(item) || selectedFridgeItems.includes(item)) {
      setWarningMessage(`${item} is already in your pantry or fridge!`);
      closeModal();
      return;
    }

    try {
      const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/fridge/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 1, // 1 = pantry
        }),
      });

      // Add item to pantry in local state
      setSelectedPantryItems([...selectedPantryItems, item]);
    } catch (err) {
      console.error('Error adding pantry item:', err);
    }
    closeModal();
  };

  // === ADD TO FRIDGE ===
  const handleAddToFridge = async (item) => {
    if (selectedPantryItems.includes(item) || selectedFridgeItems.includes(item)) {
      setWarningMessage(`${item} is already in your pantry or fridge!`);
      closeModal();
      return;
    }

    try {
      const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/fridge/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 0, // 0 = fridge
        }),
      });

      // Add item to fridge in local state
      setSelectedFridgeItems([...selectedFridgeItems, item]);
    } catch (err) {
      console.error('Error adding fridge item:', err);
    }
    closeModal();
  };

  // === REMOVE FROM PANTRY ===
  const handleRemovePantryItem = async (index) => {
    const item = selectedPantryItems[index];
    try {
      const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/fridge/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 1,
        }),
      });

      // Remove item from state and highlighted set
      const updated = [...selectedPantryItems];
      updated.splice(index, 1);
      setSelectedPantryItems(updated);

      const newSet = new Set(highlightedPantry);
      newSet.delete(item);
      setHighlightedPantry(newSet);
    } catch (err) {
      console.error('Error removing pantry item:', err);
    }
  };

  // === REMOVE FROM FRIDGE ===
  const handleRemoveFridgeItem = async (index) => {
    const item = selectedFridgeItems[index];
    try {
      const userRes = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/fridge/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 0,
        }),
      });

      // Update fridge list and highlighted set
      const updated = [...selectedFridgeItems];
      updated.splice(index, 1);
      setSelectedFridgeItems(updated);

      const newSet = new Set(highlightedFridge);
      newSet.delete(item);
      setHighlightedFridge(newSet);
    } catch (err) {
      console.error('Error removing fridge item:', err);
    }
  };

  // === SUGGEST RECIPES BASED ON INGREDIENTS ===
  const handleSuggestRecipe = async () => {
    let ingredients = [...highlightedPantry, ...highlightedFridge];

    // If nothing is highlighted, use everything
    if (ingredients.length === 0) {
      ingredients = [...selectedFridgeItems, ...selectedPantryItems];
    }

    try {
      const res = await fetch('https://ec2-99-79-7-165.ca-central-1.compute.amazonaws.com/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) throw new Error('Failed to fetch recipes');

      const matchingRecipes = await res.json();

      // Navigate to recipe suggestion page with result data
      navigate('/suggestRecipes', { state: { recipes: matchingRecipes } });
    } catch (err) {
      console.error('Error suggesting recipe:', err);
      setWarningMessage('Something went wrong while fetching recipe suggestions.');
    }
  };

  const selectedTagNames = selectedTags.map(tag => tag.name);

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <main className="p-6 space-y-8 max-w-3xl mx-auto bg-white rounded-xl shadow border border-[#CDC6B6]">
        <h1 className="text-3xl font-bold text-center text-castIron">What's in Your Kitchen?</h1>

        {/* Search bar to find and add ingredients */}
        <SearchBarWithDropdown onSearch={openModalForItem} />

        {/* Pantry section with removable and highlightable items */}
        <h2 className="text-xl font-semibold text-black mt-6 flex items-center gap-2">
          Pantry
          <div className="relative group inline-block">
            <div className="w-5 h-5 flex items-center justify-center rounded-full border text-sm font-bold text-black bg-white cursor-pointer group-hover:bg-gray-100">
              ?
            </div>

            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm rounded px-3 py-1 whitespace-nowrap shadow-lg z-20">
              Pantry is the food that you will always have and most likely things that you will not run out of.(eg. Sugar,Salt,Oil)
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45"></div>
            </div>
          </div>
        </h2>
        <SearchList
          items={selectedPantryItems}
          onRemove={handleRemovePantryItem}
          highlightedItems={highlightedPantry}
          setHighlightedItems={setHighlightedPantry}
        />

        {/* Fridge section */}
        <h2 className="text-xl font-semibold text-black mt-6 flex items-center gap-2">
          Fridge
          <div className="relative group inline-block">
            <div className="w-5 h-5 flex items-center justify-center rounded-full border text-sm font-bold text-black bg-white cursor-pointer group-hover:bg-gray-100">
              ?
            </div>

            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm rounded px-3 py-1 whitespace-nowrap shadow-lg z-20">
              Fresh items you buy on weekly basis.
              <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45"></div>
            </div>
          </div>
        </h2>
      
        <SearchList
          items={selectedFridgeItems}
          onRemove={handleRemoveFridgeItem}
          highlightedItems={highlightedFridge}
          setHighlightedItems={setHighlightedFridge}
        />

        {/* Filter by tags */}
        <FilterTagSection 
          onFilterChange={setSelectedTags} 
          selectedTags={selectedTags}
        />

        {/* Recipe suggestion trigger */}
        <div className="flex justify-center pt-4">
          <PrimaryButton onClick={handleSuggestRecipe}>Suggest Recipe</PrimaryButton>
        </div>
      </main>

      {/* Modal to add an ingredient to pantry or fridge */}
      <IngredientModal
        ingredient={modalIngredient}
        onClose={closeModal}
        onAddToPantry={handleAddToPantry}
        onAddToFridge={handleAddToFridge}
      />

      {/* Show error messages if needed */}
      {warningMessage && (
        <WarningModal
          message={warningMessage}
          onClose={() => setWarningMessage('')}
        />
      )}
    </div>
  );
}
