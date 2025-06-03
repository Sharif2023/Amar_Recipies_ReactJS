import React, { useEffect, useState } from 'react';

const backendBaseUrl = 'http://localhost/Amar_Recipies_jsx/Amar_Recipe/src/api/';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${backendBaseUrl}get_reports.php`);
      const json = await res.json();
      if (json.success) {
        setReports(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const deleteReport = async (id) => {
    if (!window.confirm('আপনি কি এই রিপোর্ট মুছে ফেলতে চান?')) return;
    try {
      const res = await fetch(`${backendBaseUrl}delete_report.php?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setReports((prev) => prev.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateReportStatus = async (id, status) => {
    try {
      const res = await fetch(`${backendBaseUrl}update_report_status.php`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (json.success) {
        setReports((prev) => prev.map(r => r.id === id ? {...r, status} : r));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMail = async (report) => {
    // Simulate sending mail (or integrate your mail backend)
    alert(`Send mail to: ${report.reporter_email} about report #${report.id}`);
  };

  if (loading) return <p>লোড হচ্ছে...</p>;

  if (reports.length === 0) return <p>কোনো রিপোর্ট পাওয়া যায়নি।</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold dark:text-white">রিপোর্ট তালিকা</h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">রেসিপির আইডি</th>
            <th className="border border-gray-300 p-2">কারণসমূহ</th>
            <th className="border border-gray-300 p-2">অন্যান্য কারণ</th>
            <th className="border border-gray-300 p-2">রিপোর্টার ইমেইল</th>
            <th className="border border-gray-300 p-2">স্ট্যাটাস</th>
            <th className="border border-gray-300 p-2">কর্ম</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="odd:bg-white even:bg-gray-100 dark:odd:bg-[#1b1b1b] dark:even:bg-[#262525]">
              <td className="border border-gray-300 p-2 text-center">{report.id}</td>
              <td className="border border-gray-300 p-2 text-center">{report.recipe_id}</td>
              <td className="border border-gray-300 p-2">
                {JSON.parse(report.reasons).join(', ')}
              </td>
              <td className="border border-gray-300 p-2">{report.other_reason || '-'}</td>
              <td className="border border-gray-300 p-2">{report.reporter_email || '-'}</td>
              <td className="border border-gray-300 p-2 text-center">{report.status}</td>
              <td className="border border-gray-300 p-2 flex justify-center gap-2">
                <button
                  className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => updateReportStatus(report.id, 'reviewed')}
                  disabled={report.status === 'reviewed'}
                  title="Mark as Reviewed"
                >
                  ✓
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => deleteReport(report.id)}
                  title="Delete"
                >
                  🗑️
                </button>
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => sendMail(report)}
                  title="Send Mail"
                >
                  ✉️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
