// RecipeModal.jsx
import React from 'react';

const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="bg-white dark:bg-[#1b1b1b] rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-xl">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{recipe.title}</h2>
                    <img src={recipe.image} alt="Recipe" className="w-full h-64 object-cover rounded-md mb-4" />

                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Category:</strong> {recipe.category}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Description:</strong> {recipe.description}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Location:</strong> {recipe.location}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Reference:</strong> <a href={recipe.reference} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{recipe.reference}</a></p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Tutorial Video:</strong> <a href={recipe.tutorialVideo} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{recipe.tutorialVideo}</a></p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Comment:</strong> {recipe.comment}</p>

                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>Submitted By:</strong> {recipe.organizerName}</p>
                        <p><strong>Email:</strong> {recipe.organizerEmail}</p>
                    </div>
                </div>

                <div className="p-4 border-t text-right">
                    <button
                        onClick={onClose}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
