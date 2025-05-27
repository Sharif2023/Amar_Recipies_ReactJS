import React, { useState, useEffect } from 'react';
import { IoStar } from 'react-icons/io5';
import RecipeModal from './RecipeModal';

const BrowseRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseImageUrl = 'http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/';

  // Fetch recipes from backend API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/get_recipes.php');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data.recipes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-[#1b1b1b]">
        <p className="text-lg dark:text-white">লোড হচ্ছে, অপেক্ষা করুন...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-[#1b1b1b]">
        <p className="text-red-500 text-lg">ত্রুটি: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-rose-100/30 dark:bg-[#1b1b1b] py-10 px-4">
      <h2 className="text-3xl lg:text-4xl text-center font-serif font-extrabold mb-10 dark:text-white tracking-wide">
        খুজে নিন যা খেতে চান 😇🍽️
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {recipes.length === 0 ? (
          <p className="text-center dark:text-gray-300">কোন রেসিপি পাওয়া যায়নি।</p>
        ) : (
          recipes.map((item) => (
            <div
              key={item.id}
              className="w-[280px] sm:w-[300px] bg-white dark:bg-[#262525] rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group"
              onClick={() => handleViewRecipe(item)}
            >

              <img
                src={
                  item.image_url
                    ? baseImageUrl + item.image_url
                    : 'https://via.placeholder.com/300x200?text=No+Image'
                }
                alt={item.title}
                className="w-full h-[200px] object-cover group-hover:brightness-90"
              />

              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold dark:text-white tracking-tighter" title={item.title}>
                    {item.title}
                  </h3>
                  <div className="flex items-center text-yellow-500 text-sm select-none">
                    <IoStar />
                    <span className="ml-1 text-black dark:text-white">
                      {/* Rating from backend or default */}
                      {item.rating ? Number(item.rating).toFixed(1) : '৪.৫'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 tracking-tight" title={item.description}>
                  {item.description.replace(/\r\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n') || 'বিস্তারিত তথ্য পাওয়া যায়নি।'}
                </p>
                <button
                  className="w-full bg-rose-600 text-white py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewRecipe(item);
                  }}
                >
                  বিস্তারিত রেসিপি
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};

export default BrowseRecipe;
