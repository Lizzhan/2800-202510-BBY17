import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBarWithDropdown from '../components/SearchBarWithDropdown';
import FilterTagSection from '../components/FilterTagSection';

export default function CreateRecipe() 
{
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [allTags, setAllTags] = useState([]);

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
        if (!title || !description || !steps) {
            alert('Please fill in all required fields');
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
            alert(res.data.message);
            setTitle('');
            setDescription('');
            setSteps('');
            setSelectedIngredients([]);
            setSelectedTagNames([]);
        }
    } catch (err) {
        console.error('Error submitting recipe:', 
          {
            error: err,
            response: err.response?.data
          }
        );
        alert(err.response?.data?.error || 'Failed to submit recipe. Please try again.');
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
        <SearchBarWithDropdown onSearch={handleIngredientSelect} />

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
        <FilterTagSection onFilterChange={setSelectedTagNames} />

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

      <div className="text-center">
        <button
          className="bg-buttonPeach text-white font-semibold px-6 py-2 rounded-xl hover:bg-buttonPeachHover transition"
          onClick={handleSubmit}
        >
          Submit Recipe
        </button>
      </div>
    </div>
  );
}