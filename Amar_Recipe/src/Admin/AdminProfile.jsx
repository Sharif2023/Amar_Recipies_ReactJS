import React from "react";

const AdminProfile = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (!admin) return <div>Unauthorized</div>;

    return (
        <div className="p-10">
            <h2 className="text-xl font-bold text-rose-700 mb-4">Admin Profile</h2>
            <p><strong>নাম:</strong> {admin.name}</p>
            <p><strong>ইমেইল:</strong> {admin.email}</p>
            <p><strong>মোবাইল:</strong> {admin.phone}</p>
            <p><strong>শহর:</strong> {admin.city}</p>
            <p><strong>বিভাগ:</strong> {admin.state}</p>
            <p><strong>রন্ধন দক্ষতা:</strong> {admin.experience}</p>
            <p><strong>পোর্টফোলিও:</strong> {admin.portfolio}</p>
            <p><strong>সার্টিফিকেশন তথ্য:</strong> {admin.certifacation}</p>
        </div>
    );
};

export default AdminProfile;
