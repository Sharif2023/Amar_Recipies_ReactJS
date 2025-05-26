import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-10 font-bengali">
      <h1 className="text-4xl font-bold text-center text-[#8c0327] mb-8">আমাদের সম্পর্কে</h1>

      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          স্বাগতম <span className="font-semibold text-[#8c0327]">আমার রেসিপি</span> — এটি একটি সর্বজনীন প্ল্যাটফর্ম যেখানে আপনি দেশি ও বিদেশি রেসিপি খুঁজে পেতে, শেয়ার করতে এবং উপভোগ করতে পারবেন। আমাদের লক্ষ্য রান্নাকে আরও সহজ, আনন্দদায়ক এবং সামাজিক করে তোলা।
        </p>

        <h2 className="text-2xl font-semibold text-[#8c0327] mb-4">আমরা কী অফার করি</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>✨ বাংলাদেশের ঐতিহ্যবাহী খাবার থেকে শুরু করে ইতালিয়ান ডিশ পর্যন্ত অসংখ্য রেসিপি এক জায়গায়।</li>
          <li>👨‍🍳 নিজের রেসিপি সাবমিট করুন — ছবি, রেফারেন্স ও ভিডিও টিউটোরিয়ালসহ।</li>
          <li>🔍 মিট, সালাদ, স্ন্যাকস, ড্রিংকস সহ বিভিন্ন ক্যাটাগরিতে ব্রাউজ করুন।</li>
          <li>🛡️ অ্যাডমিন যাচাইয়ের মাধ্যমে রেসিপির গুণগত মান ও নিরাপত্তা নিশ্চিত করা হয়।</li>
          <li>💬 অন্যান্য ফুড লাভারদের সঙ্গে যুক্ত হোন, মন্তব্য করুন এবং একটি কমিউনিটি তৈরি করুন।</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#8c0327] mt-8 mb-4">আমরা এটি কেন তৈরি করেছি</h2>
        <p className="text-gray-700 leading-relaxed">
          আমরা বিশ্বাস করি রান্না হওয়া উচিত আনন্দময়, সহজ এবং সামাজিক। আপনি যদি একজন নতুন রাঁধুনি হন বা অভিজ্ঞ শেফ, এই প্ল্যাটফর্মটি আপনাকে নতুন রেসিপি আবিষ্কার করতে, অন্যদের থেকে শিখতে এবং নিজের বিশেষ রেসিপি শেয়ার করতে সহায়তা করবে।
        </p>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">ভালোবাসা দিয়ে তৈরি ❤️, উৎসাহী ডেভেলপার ও ফুড লাভারদের দ্বারা।</p>
        </div>
      </div>
    </div>
  );
};

export default About;
