import React from "react";

const AdminProfile = () => {

  const formatCertification = (certificationText) => {
    return certificationText.split('\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-600 text-lg font-semibold">Unauthorized Access</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-rose-200">
      <h2 className="text-3xl font-extrabold text-rose-700 mb-8 border-b border-rose-300 pb-3">
        অ্যাডমিন প্রোফাইল
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <div>
          <p className="font-semibold text-lg mb-1">নাম</p>
          <p className="text-gray-900">{admin.name}</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">ইমেইল</p>
          <p className="text-gray-900">{admin.email}</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">মোবাইল</p>
          <p className="text-gray-900">{admin.phone}</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">শহর</p>
          <p className="text-gray-900">{admin.city}</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">বিভাগ</p>
          <p className="text-gray-900">{admin.state}</p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-1">রন্ধন দক্ষতা (বছর)</p>
          <p className="text-gray-900">{admin.experience}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold text-lg mb-1">পোর্টফোলিও</p>
          {admin.portfolio ? (
            <a
              href={admin.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:underline break-all"
            >
              {admin.portfolio}
            </a>
          ) : (
            <p className="text-gray-500 italic">কোনো পোর্টফোলিও নেই</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold text-lg mb-1">সার্টিফিকেশন তথ্য</p>
          <p className="text-gray-900">{formatCertification(admin.certification) || "নাই"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
