import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        date: "",
        area: "",
        city: "",
        state: "",
        postcode: "",
        experience: "",
        specialty: "",
        portfolio: "",
        certification: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/admin_api/admin_signup.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const text = await res.text();
            try {
                const data = JSON.parse(text);
                alert(data.message);

                if (data.message === "Signup request submitted") {
                    setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        date: "",
                        area: "",
                        city: "",
                        state: "",
                        postcode: "",
                        experience: "",
                        specialty: "",
                        portfolio: "",
                        certification: "",
                        password: "",
                        confirmPassword: "",
                    });
                }
            } catch (err) {
                console.error("Non-JSON response:", text);
                alert("Server error: response was not JSON. See console.");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Network or server error.");
        }
    };

    return (
        <div className="flex items-center justify-center p-12 min-h-screen bg-gray-100 bg-cover" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/039/070/453/non_2x/cooking-background-vegetables-spices-and-kitchen-utensils-on-the-table-on-a-gray-stone-background-restaurant-menu-photo.jpg')" }}>
            <div className="w-full max-w-2xl bg-white p-10 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-rose-700">Professional Admin Signup</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Full Name", name: "name", type: "text" },
                        { label: "Phone Number", name: "phone", type: "text" },
                        { label: "Email Address", name: "email", type: "email" },
                        { label: "Date", name: "date", type: "date" },
                        { label: "Area", name: "area", type: "text" },
                        { label: "City", name: "city", type: "text" },
                        { label: "State", name: "state", type: "text" },
                        { label: "Post Code", name: "postcode", type: "text" },
                        { label: "Years of Cooking Experience", name: "experience", type: "number" },
                        { label: "Specialty (e.g., desserts, vegetarian)", name: "specialty", type: "text" },
                        { label: "Portfolio Link (optional)", name: "portfolio", type: "url" },
                        { label: "Certification Details", name: "certification", type: "text" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Confirm Password", name: "confirmPassword", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div className="mb-4" key={name}>
                            <label className="block mb-2 text-gray-700 font-medium" htmlFor={name}>
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                id={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-rose-500"
                            />
                        </div>
                    ))}

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-rose-700 text-white py-3 rounded hover:bg-rose-900 transition font-semibold"
                    >
                        Submit Signup Request
                    </button>

                    <div className="flex text-sm text-blue-700 underline space-x-2 items-center justify-center py-2.5">
                        <Link to='/adminlogin'>
                            Already Have Account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
