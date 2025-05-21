import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import FilterTagSection from '../components/FilterTagSection';

const handleOverlayClick = (e) => {
  if (modalRef.current && !modalRef.current.contains(e.target)) {
    setIsModalOpen(false);
  }
};

export default function CreateRecipe() 
{
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [resetSearch, setResetSearch] = useState(false);

  const navigate = useNavigate();

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const modalRef = useRef(null);

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setSteps('');
    setSelectedIngredients([]);
    setSelectedTagNames([]);
    setResetSearch(prev => !prev);
  };

  useEffect(() =>
    {
        const fetchData = async () =>
        {
            try 
            {
                const ingredientRes = await axios.get('http://localhost:3000/api/ingredients/getingredients');
                setAllIngredients(ingredientRes.data);

                const tagsRes = await axios.get('http://localhost:3000/api/tags/GetTags');
                console.log("Fetched tags data:", tagsRes.data);
                setAllTags(tagsRes.data)
            }
            catch (err)
            {
                console.error('Failed to fetch data:', err);
            }
        };
        fetchData();
    }, []);

    const getTagsFromNames = (tagNames) =>
    {
      console.log("Converting tag names to IDs:", {
        allTags: allTags,         // Log all available tags
        selectedTagNames: tagNames // Log names we're trying to convert
      });

      const tagIds = tagNames.map(name => 
      {
        const tag = allTags.find(t => t.tag === name);
        if (!tag) 
        {
          console.warn(`Tag not found: ${name}`);
          return null;
        }
        return tag.tag_id;
      }).filter(id => id !== null);

      console.log("Converted tag IDs:", tagIds);
      return tagIds;
    };

  const handleIngredientSelect = (ingredientName) => 
    {
    const ingredient = allIngredients.find(i => i.ingredient === ingredientName);
    // Directly add to selectedIngredients if not already added
    if (ingredient && !selectedIngredients.some(i => i.ingredient_id === ingredient.ingredient_id)) 
    {
        setSelectedIngredients(prev => [...prev, ingredient]);
    }
};

  const handleAddIngredient = (item) => {
    if (!selectedIngredients.some(i => i.ingredient_id === item.ingredient_id)) {
      setSelectedIngredients([...selectedIngredients, item]);
    }
    closeModal();
  };

  const handleRemoveIngredient = (id) => {
    setSelectedIngredients(selectedIngredients.filter(i => i.ingredient_id !== id));
  };

  const handleSubmit = async () => 
  {
    try 
    {
        
      if (!title || !description || !steps) 
      {
        setModalContent('Please fill in all required fields');
        setIsModalOpen(true);
        return;
      }

        const submissionData = {
            recipe_title: title,
            description,
            steps,
            ingredients: selectedIngredients.map(i => i.ingredient_id), // Just send IDs
            tags: getTagsFromNames(selectedTagNames) // converts names to IDs
        };

        console.log("submitting: ", submissionData);

        const res = await axios.post('http://localhost:3000/api/submitRecipe',
            submissionData, 
            { withCredentials: true }
          );

        if (res.data?.message) {
            setModalContent(res.data.message);
            setIsModalOpen(true);
            setModalAction(() => () => navigate('/cookbook')); 
        }
    } catch (err) {
        setModalContent(err.response?.data?.error || 'Failed to submit recipe. Please try again.');
        setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Submit New Recipe</h1>

      <input
        type="text"
        placeholder="Recipe Title"
        className="w-full p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div>
        <h2 className="font-medium mb-1">Search & Add Ingredients</h2>
        <SearchBarWithDropdown onSearch={handleIngredientSelect} resetTrigger={resetSearch} />

        <div className="flex flex-wrap gap-2 mt-2">
          {selectedIngredients.map((item) => (
            <div
              key={item.ingredient_id}
              className="bg-peach text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{item.ingredient}</span>
              <button onClick={() => handleRemoveIngredient(item.ingredient_id)}>×</button>
            </div>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Steps"
        className="w-full p-2 border border-gray-300 rounded"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      ></textarea>

      <div>
        <h2 className="font-medium mb-1">Tags</h2>
        <FilterTagSection onFilterChange={setSelectedTagNames} 
                          selectedTags={selectedTagNames}/>

            <div className="flex flex-wrap gap-2 mt-2">
            {selectedTagNames.map((tagName) => (
                <div
                    key={tagName}  // Use the actual ID
                    className="bg-buttonPeach text-white px-3 py-1 rounded-full"
                >
                {tagName}
                </div>
        ))}
        </div>
      </div>

      <div className="text-center space-y-2">
        <button
          className="bg-buttonPeach text-white font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition"
          onClick={handleSubmit}>
          Submit Recipe
        </button>
        <br></br>
        <button
          className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl hover:bg-gray-400 transition ml-2"
          onClick={handleReset}>
            Reset
        </button>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={handleOverlayClick}>
            <div
              ref={modalRef}
              className="bg-white max-w-md w-full rounded shadow-lg">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Notice</h2>
                <button
                  onClick={() => 
                    {
                      setIsModalOpen(false);
                      setModalAction(null);
                    }}
                  className="text-gray-600 hover:text-black text-xl">
                  &times;
                </button>
              </div>
              <div className="p-6 text-gray-700">
                <p>{modalContent}</p>
              </div>
              {modalAction && (
                <div className="p-4 border-t text-center">
                  <button
                    onClick={() => modalAction()}
                    className="bg-buttonPeach text-white font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition">
                      Return to Cookbook
                    </button>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}