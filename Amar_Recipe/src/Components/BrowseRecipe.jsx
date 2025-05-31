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

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

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

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Generate dynamic pagination range with ellipses and sliding window around currentPage
  const renderPagination = () => {
    if (totalPages <= 7) {
      // Show all pages if total <= 7
      return [...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;
        return (
          <li key={pageNum}>
            <button
              onClick={() => handlePageChange(pageNum)}
              className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isActive
                  ? 'bg-blue-50 text-rose-600 dark:bg-gray-700 dark:text-white'
                  : 'bg-white text-gray-500'
                }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          </li>
        );
      });
    }

    const pages = [];
    const leftSiblingIndex = Math.max(currentPage - 1, 2);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

    // Helper to add page button
    const addPage = (pageNum) => {
      const isActive = pageNum === currentPage;
      pages.push(
        <li key={pageNum}>
          <button
            onClick={() => handlePageChange(pageNum)}
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isActive
                ? 'bg-blue-50 text-rose-600 dark:bg-gray-700 dark:text-white'
                : 'bg-white text-gray-500'
              }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        </li>
      );
    };

    // Always show first page
    addPage(1);

    // Show ellipsis if leftSiblingIndex > 2 (means gap between first and left sibling)
    if (leftSiblingIndex > 2) {
      pages.push(
        <li
          key="left-ellipsis"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 dark:text-gray-400 select-none"
        >
          ...
        </li>
      );
    } else {
      // If no gap, show pages 2 to leftSiblingIndex - 1 normally
      for (let i = 2; i < leftSiblingIndex; i++) {
        addPage(i);
      }
    }

    // Show pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      addPage(i);
    }

    // Show ellipsis if rightSiblingIndex < totalPages - 1 (gap between right sibling and last page)
    if (rightSiblingIndex < totalPages - 1) {
      pages.push(
        <li
          key="right-ellipsis"
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 dark:text-gray-400 select-none"
        >
          ...
        </li>
      );
    } else {
      // If no gap, show pages rightSiblingIndex+1 to totalPages-1 normally
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
        addPage(i);
      }
    }

    // Always show last page
    addPage(totalPages);

    return pages;
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
        {currentRecipes.length === 0 ? (
          <p className="text-center dark:text-gray-300">কোন রেসিপি পাওয়া যায়নি।</p>
        ) : (
          currentRecipes.map((item) => (
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
                      {item.rating ? Number(item.rating).toFixed(1) : '৪.৫'}
                    </span>
                  </div>
                </div>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 tracking-tight"
                  title={item.description}
                >
                  {item.description
                    .replace(/\r\n/g, '\n')
                    .replace(/\\n/g, '\n')
                    .replace(/\\r/g, '\n') || 'বিস্তারিত তথ্য পাওয়া যায়নি।'}
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

      {/* Pagination */}
      <nav className="flex justify-center pt-10" aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>

          {renderPagination()}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {selectedRecipe && (
        <RecipeModal isOpen={showModal} onClose={() => setShowModal(false)} recipe={selectedRecipe} />
      )}
    </div>
  );
};

export default BrowseRecipe;
