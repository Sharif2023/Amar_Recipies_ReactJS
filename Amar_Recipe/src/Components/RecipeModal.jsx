// RecipeModal.jsx
import React from 'react';
const backendBaseUrl = 'http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/';
const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1b1b1b] rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-xl">
                <div className="p-6">
                    <div className="flex items-center justify-center relative mb-4">
                        <h2 className="text-2xl font-bold dark:text-white">{recipe.title}</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 absolute right-0 cursor-pointer hover:text-[#ff3300]" onClick={onClose}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <img
                        src={recipe.image_url ? backendBaseUrl + recipe.image_url : 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={recipe.title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />

                    <p className="text-gray-700 dark:text-gray-300 mb-2 py-2"><strong>রেসিপির নাম</strong> {recipe.title}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 py-2"><strong>ধরণ:</strong> {recipe.category}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 py-2"><strong>বানানোর প্রক্রিয়া:</strong><br /> {recipe.description}</p>

                    <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>মন্তব্য:</strong> {recipe.comment}</p>
                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <strong>রেফারেন্স লিংক:</strong>{' '}
                            <a
                                href={recipe.reference}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {recipe.reference}
                            </a>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            <strong>ভিডিও টিউটোরিয়াল:</strong>{' '}
                            <a
                                href={recipe.tutorialVideo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {recipe.tutorialVideo}
                            </a>
                        </p>

                    </div>
                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>অবস্থান:</strong> {recipe.location}</p>
                        <p><strong>রেসিপিদাতার নাম:</strong> {recipe.organizerName}</p>
                        <p><strong>ইমেইল:</strong> {recipe.organizerEmail}</p>
                    </div>
                </div>

                <div className="p-4 border-t text-right">
                    <button
                        onClick={onClose}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
                    >
                        বন্ধ করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
