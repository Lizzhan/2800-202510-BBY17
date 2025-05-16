import { useState, useEffect } from 'react';
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import SearchList from '../components/SearchList';
import FilterTagSection from '../components/FilterTagSection';
import PrimaryButton from '../components/PrimaryButton';
import IngredientModal from '../components/IngredientModal';

export default function fridge({ onNavigate }) {

useEffect(() => {
  const userId = 24; // 🔁 Replace this with actual user ID from session/context

  fetch(`http://localhost:3000/api/fridge/${userId}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      const pantryItems = data.filter(i => i.in_pantry === 1).map(i => i.ingredient);
      const fridgeItems = data.filter(i => i.in_pantry === 0).map(i => i.ingredient);

      setSelectedPantryItems(pantryItems);
      setSelectedFridgeItems(fridgeItems);
    })
    .catch((err) => console.error('Error fetching fridge data:', err));
}, []);

  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);
  const [modalIngredient, setModalIngredient] = useState(null);

  const openModalForItem = (item) => setModalIngredient(item);
  const closeModal = () => setModalIngredient(null);

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
    console.log('Pantry:', selectedPantryItems);
    console.log('Fridge:', selectedFridgeItems);
    alert('Suggesting a recipe...');
    // You can navigate to suggest page here if needed
    // onNavigate('suggest');
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <main className="p-4 space-y-8 max-w-2xl mx-auto">
        <SearchBarWithDropdown onSearch={openModalForItem} />

        <h2 className="text-xl font-semibold">Pantry</h2>
        <SearchList items={selectedPantryItems} onRemove={handleRemovePantryItem} />

        <h2 className="text-xl font-semibold">Fridge</h2>
        <SearchList items={selectedFridgeItems} onRemove={handleRemoveFridgeItem} />

        <FilterTagSection onFilterChange={(tags) => console.log('Filters:', tags)} />

        <div className="flex justify-center pt-4">
          <PrimaryButton onClick={handleSuggestRecipe}>Suggest Recipe</PrimaryButton>
        </div>
      </main>

      <IngredientModal
        ingredient={modalIngredient}
        onClose={closeModal}
        onAddToPantry={handleAddToPantry}
        onAddToFridge={handleAddToFridge}
      />
    </div>
  );
}
