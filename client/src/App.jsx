import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import SearchBarWithDropdown from "./components/search_bar_w_dropdown";
import SearchList from "./components/ScrollablePantry";
import IngredientModal from "./components/IngredientModal"; // ← new modal component

const allItems = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
];

export default function App() {
  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);
  const [modalIngredient, setModalIngredient] = useState(null);

  // Triggered when user selects an ingredient
  const openModalForItem = (item) => {
    setModalIngredient(item);
  };

  // Close modal without action
  const closeModal = () => {
    setModalIngredient(null);
  };

  // Add to pantry
  const handleAddToPantry = (item) => {
    if (!selectedPantryItems.includes(item)) {
      setSelectedPantryItems([...selectedPantryItems, item]);
    }
    closeModal();
  };

  // Add to fridge
  const handleAddToFridge = (item) => {
    if (!selectedFridgeItems.includes(item)) {
      setSelectedFridgeItems([...selectedFridgeItems, item]);
    }
    closeModal();
  };

  return (
    <>
      <Navbar />
      <main className="p-4 space-y-8 max-w-2xl mx-auto">
        <SearchBarWithDropdown onSearch={openModalForItem} />

        <h2 className="text-xl font-semibold">Pantry</h2>
        <SearchList items={selectedPantryItems} />

        <h2 className="text-xl font-semibold">Fridge</h2>
        <SearchList items={selectedFridgeItems} />
      </main>

      {/* Modal rendered last for z-index layering */}
      <IngredientModal
        ingredient={modalIngredient}
        onClose={closeModal}
        onAddToPantry={handleAddToPantry}
        onAddToFridge={handleAddToFridge}
      />
    </>
  );
}
