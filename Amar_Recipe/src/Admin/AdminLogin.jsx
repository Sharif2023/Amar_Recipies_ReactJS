import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const AdminLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogIn = async () => {
        try {
            const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/admin_login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("admin", JSON.stringify(data.admin));
                navigate("/adminpanel");
            } else {
                alert(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Network error during login.");
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen p-5 bg-cover" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.webp')" }}>
            <div className="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
                <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
                    Admin Login
                </h1>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleLogIn}
                            className="bg-rose-700 hover:bg-rose-900 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600"
                            type="button"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex text-sm text-blue-700 underline space-x-2 items-center justify-center py-2.5">
                        <Link to='/adminsignup'>
                            Create Admin Account
                        </Link>
                        <Link to={''}>
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
