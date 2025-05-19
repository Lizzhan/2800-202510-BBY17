import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import SearchList from '../components/SearchList';
import FilterTagSection from '../components/FilterTagSection';
import PrimaryButton from '../components/PrimaryButton';
import IngredientModal from '../components/IngredientModal';
import WarningModal from '../components/WarningModal';

export default function Fridge({ onNavigate }) {
  const navigate = useNavigate();

  const [selectedPantryItems, setSelectedPantryItems] = useState([]);
  const [selectedFridgeItems, setSelectedFridgeItems] = useState([]);
  const [modalIngredient, setModalIngredient] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  const [highlightedPantry, setHighlightedPantry] = useState(new Set());
  const [highlightedFridge, setHighlightedFridge] = useState(new Set());

  useEffect(() => {
    const fetchFridgeData = async () => {
      try {
        const userRes = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include',
        });
        const userData = await userRes.json();

        const fridgeRes = await fetch(`http://localhost:3000/api/fridge/${userData.id}`, {
          credentials: 'include',
        });
        const data = await fridgeRes.json();

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

  const openModalForItem = (item) => setModalIngredient(item);
  const closeModal = () => setModalIngredient(null);

  const handleAddToPantry = async (item) => {
    if (selectedPantryItems.includes(item) || selectedFridgeItems.includes(item)) {
      setWarningMessage(`${item} is already in your pantry or fridge!`);
      closeModal();
      return;
    }

    try {
      const userRes = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('http://localhost:3000/api/fridge/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 1,
        }),
      });

      setSelectedPantryItems([...selectedPantryItems, item]);
    } catch (err) {
      console.error('Error adding pantry item:', err);
    }
    closeModal();
  };

  const handleAddToFridge = async (item) => {
    if (selectedPantryItems.includes(item) || selectedFridgeItems.includes(item)) {
      setWarningMessage(`${item} is already in your pantry or fridge!`);
      closeModal();
      return;
    }

    try {
      const userRes = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('http://localhost:3000/api/fridge/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 0,
        }),
      });

      setSelectedFridgeItems([...selectedFridgeItems, item]);
    } catch (err) {
      console.error('Error adding fridge item:', err);
    }
    closeModal();
  };

  const handleRemovePantryItem = async (index) => {
    const item = selectedPantryItems[index];
    try {
      const userRes = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('http://localhost:3000/api/fridge/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 1,
        }),
      });

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

  const handleRemoveFridgeItem = async (index) => {
    const item = selectedFridgeItems[index];
    try {
      const userRes = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });
      const userData = await userRes.json();

      await fetch('http://localhost:3000/api/fridge/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_id: userData.id,
          ingredient: item,
          in_pantry: 0,
        }),
      });

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

  const handleSuggestRecipe = () => {
    const ingredients = [...highlightedPantry, ...highlightedFridge];
    const payload = {
      ingredients,
      tags: selectedTags,
    };

    console.log("Ingredients:", ingredients);
    console.log("Tags:", selectedTags);

    alert(`Sending to /suggest:\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <main className="p-4 space-y-8 max-w-2xl mx-auto">
        <SearchBarWithDropdown onSearch={openModalForItem} />

        <h2 className="text-xl font-semibold">Pantry</h2>
        <SearchList
          items={selectedPantryItems}
          onRemove={handleRemovePantryItem}
          highlightedItems={highlightedPantry}
          setHighlightedItems={setHighlightedPantry}
        />

        <h2 className="text-xl font-semibold">Fridge</h2>
        <SearchList
          items={selectedFridgeItems}
          onRemove={handleRemoveFridgeItem}
          highlightedItems={highlightedFridge}
          setHighlightedItems={setHighlightedFridge}
        />

        <FilterTagSection onFilterChange={setSelectedTags} />

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

      {warningMessage && (
        <WarningModal
          message={warningMessage}
          onClose={() => setWarningMessage('')}
        />
      )}
    </div>
  );
}
