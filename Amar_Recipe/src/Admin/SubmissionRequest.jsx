import React, { useEffect, useState } from "react";

const SubmissionRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Open modal with submission details
  const openViewModal = (submission) => {
    setSelectedSubmission(submission);
    setViewModalOpen(true);
  };

  // Close the modal
  const closeViewModal = () => {
    setSelectedSubmission(null);
    setViewModalOpen(false);
  };

  // Fetch all submissions from API
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/get_submission_requests.php"
      );
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

  // Approve a submission and remove it from list locally
  const approveRequest = async (id) => {
    if (!window.confirm("Are you sure you want to approve this submission?"))
      return;
    try {
      const res = await fetch(
        "http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/approve_submission.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ id }),
        }
      );
      const json = await res.json();
      if (json.success) {
        alert("Submission approved and moved to recipes.");
        setRequests((prev) => prev.filter((req) => req.id !== id));
      } else {
        alert("Failed: " + json.message);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Start rejecting: open reject modal
  const startReject = (id) => {
    setRejectingId(id);
    setRejectReason("");
  };

  // Submit reject reason and remove submission locally
  const submitReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason.");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/reject_submission.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ id: rejectingId, reason: rejectReason }),
        }
      );
      const json = await res.json();
      if (json.success) {
        alert("Submission rejected.");
        setRequests((prev) => prev.filter((req) => req.id !== rejectingId));
        setRejectingId(null);
        setRejectReason("");
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
      ) : requests.length === 0 ? (
        <p className="text-center text-neutral-500 mt-10">কোনো সাবমিশন পাওয়া যায়নি।</p>
      ) : (
        <ul className="max-w-5xl mx-auto space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="flex flex-col md:flex-row items-center md:items-start bg-white dark:bg-[#262525] rounded-md shadow hover:shadow-lg p-4"
            >
              <div className="flex-shrink-0 w-24 h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-4">
                {req.image ? (
                  <img
                    src={`http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/${req.image}`}
                    alt={req.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3
                  className="text-lg font-semibold dark:text-white truncate"
                  title={req.title}
                >
                  {req.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {req.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Organiser: <strong>{req.organizerName}</strong>
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === "Approved"
                        ? "bg-green-700 text-green-300"
                        : req.status === "Rejected"
                        ? "bg-red-700 text-red-300"
                        : "bg-yellow-700 text-yellow-300"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
                {req.status === "Rejected" && req.comment && (
                  <p className="text-sm mt-1 text-red-400 italic">
                    Reason: {req.comment}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                {req.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => openViewModal(req)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </button>

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
                ) : (
                  <em className="text-gray-400">No actions</em>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-[#262525] rounded p-6 max-w-3xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={closeViewModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {selectedSubmission.title}
            </h2>

            {selectedSubmission.image ? (
              <img
                src={`http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/${selectedSubmission.image}`}
                alt={selectedSubmission.title}
                className="w-full max-h-64 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                No Image
              </div>
            )}

            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Category:</strong> {selectedSubmission.category}
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Organizer:</strong> {selectedSubmission.organizerName}
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Location:</strong> {selectedSubmission.location}
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Description:</strong>
            </p>
            <p className="mb-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
              {selectedSubmission.description}
            </p>

            {selectedSubmission.reference && (
              <p className="mb-2">
                <strong>Reference: </strong>
                <a
                  href={selectedSubmission.reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedSubmission.reference}
                </a>
              </p>
            )}

            {selectedSubmission.tutorialVideo && (
              <p className="mb-4">
                <strong>Tutorial Video: </strong>
                <a
                  href={selectedSubmission.tutorialVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Watch here
                </a>
              </p>
            )}
          </div>
        </div>
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
