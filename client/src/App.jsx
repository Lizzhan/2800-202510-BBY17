import React, { useState } from "react";
import Navbar from "./components/topnavbar";
import SearchBarWithDropdown from "./components/search_bar_w_dropdown";
import SearchList from "./components/ScrollablePantry";
import IngredientModal from "./components/IngredientModal";
import PrimaryButton from "./components/button";

const allItems = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry",
  "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"
];

export default function App() {
  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);
  const [modalIngredient, setModalIngredient] = useState(null);

  const openModalForItem = (item) => {
    setModalIngredient(item);
  };

  const closeModal = () => {
    setModalIngredient(null);
  };

  const handleAddToPantry = (item) => {
    if (!selectedPantryItems.includes(item)) {
      setSelectedPantryItems([...selectedPantryItems, item]);
    }
    closeModal();
  };

  const handleAddToFridge = (item) => {
    if (!selectedFridgeItems.includes(item)) {
      setSelectedFridgeItems([...selectedFridgeItems, item]);
    }
    closeModal();
  };

  const handleRemovePantryItem = (index) => {
    const newItems = [...selectedPantryItems];
    newItems.splice(index, 1);
    setSelectedPantryItems(newItems);
  };

  const handleRemoveFridgeItem = (index) => {
    const newItems = [...selectedFridgeItems];
    newItems.splice(index, 1);
    setSelectedFridgeItems(newItems);
  };

  const handleSuggestRecipe = () => {
    console.log("Pantry ingredients:", selectedPantryItems);
    console.log("Fridge ingredients:", selectedFridgeItems);
    alert("Suggesting a recipe based on your ingredients...");
  };

  return (
    <>
    <div className="min-h-screen bg-[#FDF6EC]">
      <Navbar />
      <main className="p-4 space-y-8 max-w-2xl mx-auto">
        <SearchBarWithDropdown onSearch={openModalForItem} />

        <h2 className="text-xl font-semibold">Pantry</h2>
        <SearchList items={selectedPantryItems} onRemove={handleRemovePantryItem} />

        <h2 className="text-xl font-semibold">Fridge</h2>
        <SearchList items={selectedFridgeItems} onRemove={handleRemoveFridgeItem} />

        <div className="flex justify-center pt-4">
          <PrimaryButton onClick={handleSuggestRecipe}>
            Suggest Recipe
          </PrimaryButton>
        </div>
      </main>
    </div>

      <IngredientModal
        ingredient={modalIngredient}
        onClose={closeModal}
        onAddToPantry={handleAddToPantry}
        onAddToFridge={handleAddToFridge}
      />
    </>
  );
}
