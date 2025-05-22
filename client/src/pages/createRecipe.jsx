// Imports for necessary React hooks and Libraries
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Imports for custom components
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import FilterTagSection from '../components/FilterTagSection';


/**
 * Page designed to allow users to create and submit a recipe of their own design into the Recipedia database.
 * 
 * This page prompts users to submit a title, a breif description, and the steps to cook the recipe.
 * There is also a search bar for choosing ingredients from the Recipedia database, and a tag selector to 
 * choose what type of meal you are cooking.
 * 
 * Code on this page was created from personal experience, Code Ninja, and AI Assistance.
 *
 * @returns a form layout for recipe creation with spaces for user input and selection.
 *
 * @author James Smith
 * @author https://chat.openai.com
 */
export default function CreateRecipe() 
{
  // State for text fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');

  // State fo ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  // State for tags
  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // For triggering searchBar reset
  const [resetSearch, setResetSearch] = useState(false);

  // For redirecting after user submits a recipe
  const navigate = useNavigate();

  // Used to prevent multiple submissions
  const [submitting, setSubmitting] = useState(false);

  // Used to handle the modal that pops up after submission
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const modalRef = useRef(null); // Handles clicks outside modal

  // Resets all fields and selections
  const handleReset = () => {
    setTitle('');
    setDescription('');
    setSteps('');
    setSelectedIngredients([]);
    setSelectedTagNames([]);
    setResetSearch(prev => !prev);
  };

  // Closes modal when clicking outside its box
  const handleOverlayClick = (e) => {
  if (modalRef.current && !modalRef.current.contains(e.target)) {
    setIsModalOpen(false);
  }
};

  // Fetches all ingredients and tags when component mounts
  useEffect(() =>
    {
        const fetchData = async () =>
        {
            try 
            {
                const ingredientRes = await axios.get('http://localhost:3000/api/ingredients/getingredients');
                setAllIngredients(ingredientRes.data);

                const tagsRes = await axios.get('http://localhost:3000/api/tags/GetTags');
                
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
      const tagIds = tagNames.map(name => 
      {
        const tag = allTags.find(t => t.tag === name);
        if (!tag) 
        {
          console.warn(`Tag not found: ${name}`);
          return null;
        }
        return tag.tag_id;
      }).filter(id => id !== null); // filters tags that weren't found

      return tagIds;
    };

  // Adds an ingredient from the search bar, if not already selected.
  const handleIngredientSelect = (ingredientName) => 
    {
    const ingredient = allIngredients.find(i => i.ingredient === ingredientName);
    // Directly add to selectedIngredients if not already added
    if (ingredient && !selectedIngredients.some(i => i.ingredient_id === ingredient.ingredient_id)) 
    {
        setSelectedIngredients(prev => [...prev, ingredient]);
    }
};

  // Remove an ingredient by ID
  const handleRemoveIngredient = (id) => {
    setSelectedIngredients(selectedIngredients.filter(i => i.ingredient_id !== id));
  };

  // Submit recipe to backend
  const handleSubmit = async () => 
  {
    if (submitting)
    {
      return;
    }

    setSubmitting(true);

    try 
    {
      // Ensures required fields are filled
      if (!title || !description || !steps) 
      {
        setModalContent('Please fill in all required fields');
        setIsModalOpen(true);
        return;
      }

        // Builds a payload to send to the backend
        const submissionData = {
            recipe_title: title,
            description,
            steps,
            ingredients: selectedIngredients.map(i => i.ingredient_id), // Just send IDs
            tags: getTagsFromNames(selectedTagNames) // converts names to IDs
        };

        // Post to backend
        const res = await axios.post('http://localhost:3000/api/submitRecipe',
            submissionData, 
            { withCredentials: true }
          );

        // If backend returns a message (success)
        if (res.data?.message) {
            setModalContent(res.data.message);
            setIsModalOpen(true);
            setModalAction(() => () => navigate('/cookbook')); 
        }
      // Handles error and displays message
    } catch (err) {
        setModalContent(err.response?.data?.error || 'Failed to submit recipe. Please try again.');
        setIsModalOpen(true);
    }
    finally
    {
      // Resets submission lock
      setSubmitting(false); 
    }
  };

  // JSX returned by this component
  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Submit New Recipe</h1>

      {/* Title Input */}
      <input
        type="text"
        placeholder="*Recipe Title"
        className="w-full p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description Text Area */}
      <textarea
        placeholder="*Description"
        className="w-full p-2 border border-gray-300 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {/* Ingredient Seatch Bar and Drop Down suggesitons */}
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

      {/* Steps Input */}
      <textarea
        placeholder="*Steps"
        className="w-full p-2 border border-gray-300 rounded"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      ></textarea>

      {/* Tags Selection */}
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

      {/* Submit and Reset Buttons */}
      <div className="text-center space-y-2">
        <button
          className="bg-buttonPeach text-white font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition"
          onClick={handleSubmit}
          disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Recipe'}
        </button>
        <br></br>
        <button
          className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-xl hover:bg-gray-400 transition ml-2"
          onClick={handleReset}>
            Reset
        </button>

        {/* Modal for Submission Confirmation.
            Code was adapted from Net Ninja Javascript Tutorial Series

            @author Net Ninja on Youtube 
            @author James Smith
            @see https://www.youtube.com/watch?v=tt5uUMQgzl0&list=PL4cUxeGkcC9joIM91nLzd_qaH_AimmdAR&index=16 */
        }
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