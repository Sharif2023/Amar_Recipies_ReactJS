import React, { useEffect, useState } from "react";

const HistoryDropdown = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/get_submission_history.php");
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

    fetchRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">সাবমিশন রিকুয়েষ্ট ইতিহাস</h1>

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
                <h3 className="text-lg font-semibold dark:text-white truncate" title={req.title}>
                  {req.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{req.category}</p>
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
                  <p className="text-sm mt-1 text-red-400 italic">Reason: {req.comment}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryDropdown;
