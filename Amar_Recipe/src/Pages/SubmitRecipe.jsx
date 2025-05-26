import React, { useState } from 'react';

export default function SubmitRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: null,
        location: '',
        organizerName: '',
        organizerEmail: '',
        organizerAddress: '',
        status: '',
        tags: '',
        reference: '',
        tutorialVideo: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/submit_recipe.php', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                alert('Recipe Submitted Successfully!');
                // Optionally clear the form
                setFormData({
                    title: '',
                    category: '',
                    description: '',
                    image: null,
                    location: '',
                    organizerName: '',
                    organizerEmail: '',
                    organizerAddress: '',
                    status: '',
                    tags: '',
                    reference: '',
                    tutorialVideo: '',
                    comment: ''
                });
            } else {
                alert('Submission failed: ' + result.message);
            }
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-black mb-6">Submit Recipe</h1>

            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.title}
                    onChange={handleChange}
                />

                {/* Category */}
                <select
                    name="category"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="" disabled hidden>Select Category</option>
                    <option value="All Recipes">All Recipes</option>
                    <option value="Meat">Meat</option>
                    <option value="Fish">Fish</option>
                    <option value="VegetablewithMeatorFish">Vegetable with Meat/Fish</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Bharta">Bharta</option>
                    <option value="Salad">Salad</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Rice & Pasta">Rice & Pasta</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Bangladeshi">Bangladeshi</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>

                </select>

                {/* Description & Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Recipe Description"
                        className="block w-full h-48 p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                        style={{ backgroundColor: '#f6f6f6' }}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <div>
                        <label
                            htmlFor="image"
                            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
                        >
                            <span className="text-center text-gray-500">
                                <div className="mb-2">
                                    <span className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4">
                                        Select from Computer
                                    </span>
                                </div>
                                or drag recipe photo here<br />
                                <span className="text-sm">PNG, JPG, JPEG</span>
                            </span>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleChange}
                            />
                        </label>
                        {/* Show filename if an image is selected */}
                        {formData.image && (
                            <p className="mt-2 text-gray-700 text-sm">
                                Selected file: <strong>{formData.image.name}</strong>
                            </p>
                        )}
                    </div>
                </div>

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="Region or Cuisine Origin"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.location}
                    onChange={handleChange}
                />

                {/* Submitter Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="organizerName"
                        placeholder="Your Name"
                        className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                        style={{ backgroundColor: '#f6f6f6' }}
                        value={formData.organizerName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="organizerEmail"
                        placeholder="Your Email"
                        className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                        style={{ backgroundColor: '#f6f6f6' }}
                        value={formData.organizerEmail}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */}
                <input
                    type="text"
                    name="organizerAddress"
                    placeholder="Your Address"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327]"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.organizerAddress}
                    onChange={handleChange}
                />

                {/* Status & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                        name="source"
                        className="block w-full h-12 rounded-md border-gray-300 shadow-sm"
                        style={{ backgroundColor: '#f6f6f6' }}
                        value={formData.source}
                        onChange={handleChange}
                    >
                        <option value="" selected disabled hidden> Where You Get the Recipes?</option>
                        <option value="family">From Family</option>
                        <option value="friends">From Friends</option>
                        <option value="internet">From the Internet</option>
                        <option value="books">From Cookbooks</option>
                        <option value="self">Created Myself</option>
                        <option value="other">Other</option>
                    </select>

                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma-separated)"
                        className="block w-full h-12 rounded-md border-gray-300 shadow-sm"
                        style={{ backgroundColor: '#f6f6f6' }}
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>

                {/* Reference & Tutorial Video */}
                <input
                    type="url"
                    name="reference"
                    placeholder="Reference Link (if any)"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.reference}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="tutorialVideo"
                    placeholder="Tutorial Video Link (YouTube etc)"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.tutorialVideo}
                    onChange={handleChange}
                />

                <textarea
                    name="comment"
                    rows="4"
                    placeholder="Place Comment for viewer"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm"
                    style={{ backgroundColor: '#f6f6f6' }}
                    value={formData.comment}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                >
                    Submit Recipe
                </button>
            </form>
        </div>
    );
}
