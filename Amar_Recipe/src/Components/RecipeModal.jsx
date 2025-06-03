import React, { useState } from 'react';
const backendBaseUrl = 'http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/';

const categoryBanglaMap = {
    Meat: 'মাংস',
    Fish: 'মাছ',
    Egg: 'ডিম',
    dairy: 'দুগ্ধজাত',
    VegetablewithMeatorFish: 'শাকসবজি দিয়ে মাছ/মাংস/অন্যান্য',
    Vegetables: 'শাকসবজি',
    Bharta: 'ভর্তা',
    Salad: 'সালাদ',
    achar: 'আচার',
    Soup: 'স্যুপ',
    Drinks: 'পানীয়',
    Desserts: 'ডেজার্ট, মিষ্টান্ন',
    Rice_and_Pasta: 'রাইস আইটেম',
    Snacks: 'হালকা খাবার/ ফাস্টফুড',
    SaucesAndCondiments: 'সস/মশলা',
    Bangladeshi: 'বাঙ্গালী',
    Chinese: 'চাইনিজ্জ',
    Italian: 'ইতালীয়ান',
};

const reportReasons = [
    { id: 'duplicate', label: 'ডুপলিকেট রেসিপি' },
    { id: 'wrong', label: 'ভুল রেসিপি' },
    { id: 'offensive', label: 'অশ্লীল/অপমানজনক' },
    { id: 'spam', label: 'স্প্যাম' },
];


const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen || !recipe) return null;

    const [reportOpen, setReportOpen] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [otherReason, setOtherReason] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null);

    const toggleReason = (id) => {
        setSelectedReasons((prev) =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const handleReportSubmit = async () => {
        if (selectedReasons.length === 0 && otherReason.trim() === '') {
            alert('কমপক্ষে একটি কারণ নির্বাচন করুন বা অন্যান্য কারণ লিখুন।');
            return;
        }

        const reportData = {
            recipeId: recipe.id,
            reasons: selectedReasons,
            otherReason: otherReason.trim(),
            reportedAt: new Date().toISOString(),
            reporterEmail: recipe.organizerEmail // You can replace with logged in user email if available
        };

        try {
            const res = await fetch('http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/report_recipe.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportData),
            });
            const json = await res.json();

            if (json.success) {
                setSubmitStatus('success');
                // Clear form
                setSelectedReasons([]);
                setOtherReason('');
                setTimeout(() => {
                    setReportOpen(false);
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1b1b1b] rounded-lg max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-xl">
                <div className="p-6">
                    <div className="flex items-center justify-center relative mb-4">
                        <h2 className="text-2xl font-bold dark:text-white tracking-tight">{recipe.title}</h2>
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
                        className="w-full h-full object-cover rounded-md mb-4"
                    />

                    <p className="text-gray-700 dark:text-gray-300 mb-2 py-2"><strong>রেসিপির নাম</strong> {recipe.title}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2 py-2">
                        <strong>রেসিপির ধরণ:</strong> {categoryBanglaMap[recipe.category] || recipe.category}
                    </p>

                    <p
                        className="text-gray-700 dark:text-gray-300 mb-2 py-2"
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        <strong>বানানোর প্রক্রিয়া:</strong><br /><br />{' '}
                        {recipe.description.replace(/\r\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n').replace(/\n\s*\n/g, '\n\n')}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        <strong>মন্তব্য:</strong><br /><br /> {recipe.comment && recipe.comment.trim() !== '' ? recipe.comment.replace(/\r\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n').replace(/\n\s*\n/g, '\n\n') : 'নেই'}
                    </p>

                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <strong>রেফারেন্স লিংক:</strong>{' '}
                            <a
                                href={recipe.reference}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
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
                                className="text-blue-500"
                            >
                                {recipe.tutorialVideo && recipe.tutorialVideo.trim() !== '' ? recipe.tutorialVideo : 'নেই'}
                            </a>
                        </p>

                    </div>
                    <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>অবস্থান:</strong> {recipe.location}</p>
                        <p><strong>রেসিপিদাতার নাম:</strong> {recipe.organizerName}</p>
                        <p><strong>ইমেইল:</strong> {recipe.organizerEmail}</p>
                    </div>
                </div>


                {/* Report modal */}
                {reportOpen && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-semibold mb-2 text-red-600">রিপোর্ট করার কারণ</h3>
                        <div className="flex flex-col gap-2 mb-3">
                            {reportReasons.map(({ id, label }) => (
                                <label key={id} className="inline-flex items-center space-x-2 rtl:space-x-reverse">
                                    <input
                                        type="checkbox"
                                        checked={selectedReasons.includes(id)}
                                        onChange={() => toggleReason(id)}
                                        className="form-checkbox"
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>

                        <label className="block mb-2">
                            অন্যান্য কারণ:
                            <textarea
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                rows={3}
                                className="w-full rounded border border-gray-300 p-2 text-sm dark:bg-[#2a2a2a] dark:text-white"
                                placeholder="আপনার মতামত লিখুন..."
                            />
                        </label>

                        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setReportOpen(false)}
                            >
                                বাতিল করুন
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleReportSubmit}
                            >
                                রিপোর্ট জমা দিন
                            </button>
                        </div>

                        {submitStatus === 'success' && (
                            <p className="text-green-600 mt-2">রিপোর্ট সফলভাবে জমা হয়েছে।</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="text-red-600 mt-2">রিপোর্ট জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
                        )}
                    </div>
                )}
                <div className="flex justify-between items-center p-4 border-t">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-600 hover:text-red-600"
                        title="রিপোর্ট করুন"
                        onClick={() => setReportOpen(!reportOpen)}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
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
