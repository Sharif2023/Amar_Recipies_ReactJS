import React, { useEffect, useState } from "react";

const SubmissionRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);

  // Fetch all submissions
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/get_submission_requests.php");
      const json = await res.json();
      if (json.success) {
        setRequests(json.data);
      } else {
        alert("Failed to fetch requests");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    if (!window.confirm("Are you sure you want to approve this submission?")) return;
    try {
      const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/approve_submission.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Submission approved and moved to recipes.");
        fetchRequests();
      } else {
        alert("Failed: " + json.message);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const startReject = (id) => {
    setRejectingId(id);
    setRejectReason("");
  };

  const submitReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason.");
      return;
    }
    try {
      const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/reject_submission.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ id: rejectingId, reason: rejectReason }),
      });
      const json = await res.json();
      if (json.success) {
        alert("Submission rejected.");
        setRejectingId(null);
        setRejectReason("");
        fetchRequests();
      } else {
        alert("Failed: " + json.message);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">সাবমিশন রিকুয়েষ্ট তালিকা</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Organizer</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No submissions found.
                </td>
              </tr>
            )}
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="border border-gray-300 p-2">{req.id}</td>
                <td className="border border-gray-300 p-2">{req.title}</td>
                <td className="border border-gray-300 p-2">{req.category}</td>
                <td className="border border-gray-300 p-2">{req.organizerName}</td>
                <td className="border border-gray-300 p-2">{req.status}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approveRequest(req.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => startReject(req.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {req.status !== "Pending" && <em>No actions</em>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Reject Submission</h2>
            <textarea
              className="w-full border border-gray-300 p-2 mb-4 rounded"
              rows="4"
              placeholder="Rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setRejectingId(null);
                  setRejectReason("");
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitReject}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Submit Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionRequest;
