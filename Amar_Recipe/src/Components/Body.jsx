import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import RecipeModal from './RecipeModal';

const recipeCategories = [
  {
    category: 'শাকসবজি',
    image: 'https://techakim.com/sam/tg/7268/li/imgs/pizza.jpg',
    rating: 4.8,
    desc: 'পুষ্টিকর ও তাজা শাকসবজির রান্না।',
  },
  {
    category: 'মাংস',
    image: 'https://techakim.com/sam/tg/7268/li/imgs/chicken.jpg',
    rating: 4.9,
    desc: 'মজাদার মাংসভিত্তিক রেসিপি।',
  },
  {
    category: 'পানীয়',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    rating: 4.7,
    desc: 'শীতল ও সতেজ পানীয় উপভোগ করুন।',
  },
  {
    category: 'সালাদ',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
    rating: 4.5,
    desc: 'ক্রিসপি ও স্বাস্থ্যকর সালাদ বাটি।',
  },
];

const Body = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleViewRecipe = () => {
    setSelectedRecipe({
      title: 'মসলা চিকেন কারি',
      category: 'মাংস',
      description: 'গাঢ় স্বাদ ও ঘ্রাণযুক্ত ঐতিহ্যবাহী মসলা চিকেন কারি।',
      image: 'https://techakim.com/sam/tg/7268/li/imgs/chicken.jpg',
      location: 'ঢাকা, বাংলাদেশ',
      organizerName: 'রুহুল আমিন',
      organizerEmail: 'ruhul@example.com',
      organizerAddress: '১২৩ ধানমন্ডি, ঢাকা',
      reference: 'https://example.com/chickencurry',
      tutorialVideo: 'https://youtube.com/examplevideo',
      comment: 'ভাত অথবা নান রুটির সাথে খেতে দারুণ লাগবে।',
    });
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-rose-100/30 dark:bg-[#1b1b1b] py-10">
      <h2 className="text-3xl lg:text-4xl text-center font-serif font-bold mb-10 dark:text-white">
        খুজে নিন যা খেতে চান 😇🍽️
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {recipeCategories.map((item, index) => (
          <div
            key={index}
            className="w-[280px] sm:w-[300px] bg-white dark:bg-[#262525] rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <img
              src={item.image}
              alt={item.category}
              className="w-full h-[200px] object-cover group-hover:brightness-90"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold dark:text-white">{item.category}</h3>
                <div className="flex items-center text-yellow-500 text-lg">
                  <IoStar />
                  <span className="ml-1 text-black dark:text-white">{item.rating}</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              <button
                className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-700 transition"
                onClick={handleViewRecipe}
              >
                বিস্তারিত রেসিপি
              </button>
            </div>
          </div>
        ))}
      </div>
      <RecipeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default Body;
