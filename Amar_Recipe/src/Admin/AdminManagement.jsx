import React, { useEffect, useState } from "react";

const AdminManagement = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedAdmins, setApprovedAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Fetch data
  const fetchRequests = async () => {
    const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/admin_requests.php");
    const data = await res.json();
    setPendingRequests(data.filter(admin => admin.status === "pending"));
    setApprovedAdmins(data.filter(admin => admin.status === "approved"));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/update_admin_status.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchRequests();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-rose-700 mb-6">Admin Management Panel</h1>

      {/* Pending Requests */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Requests</h2>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-600">No pending requests.</p>
        ) : (
          <table className="w-full border text-sm bg-white shadow">
            <thead>
              <tr className="bg-rose-100">
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Specialty</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="px-3 py-2">{admin.name}</td>
                  <td className="px-3 py-2">{admin.email}</td>
                  <td className="px-3 py-2">{admin.specialty}</td>
                  <td className="px-3 py-2 space-x-2">
                    <button
                      onClick={() => setSelectedAdmin(admin)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => updateStatus(admin.id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(admin.id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Approved Admins */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Approved Admins</h2>
        {approvedAdmins.length === 0 ? (
          <p className="text-gray-600">No approved admins yet.</p>
        ) : (
          <ul className="space-y-2">
            {approvedAdmins.map((admin) => (
              <li key={admin.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                <span>
                  <strong>{admin.name}</strong> – {admin.email}
                </span>
                <button
                  onClick={() => setSelectedAdmin(admin)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for viewing admin details */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-xl">
            <h3 className="text-xl font-bold text-rose-700 mb-4">Admin Details</h3>
            <ul className="text-sm text-gray-800 space-y-1">
              <li><strong>Name:</strong> {selectedAdmin.name}</li>
              <li><strong>Email:</strong> {selectedAdmin.email}</li>
              <li><strong>Phone:</strong> {selectedAdmin.phone}</li>
              <li><strong>Specialty:</strong> {selectedAdmin.specialty}</li>
              <li><strong>Experience:</strong> {selectedAdmin.experience} years</li>
              <li><strong>Certification:</strong> {selectedAdmin.certification}</li>
              <li><strong>City:</strong> {selectedAdmin.city}</li>
              <li><strong>Date:</strong> {selectedAdmin.date}</li>
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedAdmin(null)}
                className="bg-rose-700 text-white px-4 py-2 rounded hover:bg-rose-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
