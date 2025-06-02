import React from "react";

const AdminProfile = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin) return <div>Unauthorized</div>;

    return (
        <div className="p-10">
            <h2 className="text-xl font-bold text-rose-700 mb-4">Admin Profile</h2>
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>City:</strong> {admin.city}</p>
            <p><strong>Specialty:</strong> {admin.specialty}</p>
            {/* Add other fields as necessary */}
        </div>
    );
};

export default AdminProfile;
