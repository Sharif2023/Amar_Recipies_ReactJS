import React, { useEffect, useState } from "react";

const AdminManagement = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedAdmins, setApprovedAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const fetchRequests = async () => {
    const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/admin_requests.php", {
      cache: "no-store",
    });
    const data = await res.json();
    console.log("Fetched updated data:", data);

    setPendingRequests(data.filter(admin => admin.status === "pending"));
    setApprovedAdmins(data.filter(admin => admin.status === "approved"));
  };


  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    console.log(`Updating admin id=${id} to status=${status}`);

    try {
      const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/update_admin_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Response JSON:', data);

      if (res.ok && data.message) {
        alert(data.message);
        fetchRequests(); // Refresh data after update
      } else {
        alert("Failed to update status: " + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Network or server error during updateStatus:", error);
      alert("Network error while updating status.");
    }
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
                      onClick={async () => {
                        const reason = prompt("Enter rejection reason:");
                        if (!reason) return alert("Rejection reason is required.");

                        try {
                          const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/admin_api/admin_req_reject.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: admin.id, reason }),
                          });

                          const text = await res.text();
                          console.log("Raw reject response text:", text); // 👈 show raw data

                          // Try parsing the JSON
                          let data;
                          try {
                            data = JSON.parse(text);
                          } catch (parseErr) {
                            console.error("❌ JSON parse error:", parseErr);
                            alert("❌ Server response is not valid JSON. Check console.");
                            return;
                          }

                          alert(data.success ? "✅ Rejected successfully" : data.message || "⚠️ Unknown error");
                          fetchRequests();
                        } catch (err) {
                          console.error("❌ Network error during fetch:", err);
                          alert("❌ Network request failed.");
                        }
                      }}
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
