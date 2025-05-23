import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#8c0327] mb-8">About Us</h1>

      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold text-[#8c0327]">RecipeZone</span> — your one-stop platform to discover, share, and enjoy amazing recipes from all over the world! Our mission is to make cooking more accessible, enjoyable, and community-driven.
        </p>

        <h2 className="text-2xl font-semibold text-[#8c0327] mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>✨ Explore a wide variety of recipes — from Bangladeshi classics to Italian favorites.</li>
          <li>👨‍🍳 Submit your own creations with images, reference sources, and tutorial video links.</li>
          <li>🔍 Browse recipes by category like Meat, Salad, Snacks, Drinks, and more.</li>
          <li>🛡️ Admin moderation ensures content quality and safety.</li>
          <li>💬 Connect with other food lovers, leave comments, and build a food community.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8c0327] mt-8 mb-4">Why We Built This</h2>
        <p className="text-gray-700 leading-relaxed">
          We believe cooking should be fun, simple, and social. Whether you're a beginner or a kitchen pro, this platform empowers you to explore new dishes, learn from others, and even teach your own special recipes.
        </p>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">Made with ❤️ by passionate developers & foodies.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
