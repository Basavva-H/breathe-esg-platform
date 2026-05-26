import { useEffect, useState } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login";
import AuditLogs from "./AuditLogs";

const token = localStorage.getItem(
  "access_token"
);
function App() {

  const [sapFile, setSapFile] = useState(null);
  const [utilityFile, setUtilityFile] = useState(null);
  const [travelFile, setTravelFile] = useState(null);

  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const totalRecords = records.length;

  const approvedCount = records.filter(
    (record) => record.status === "approved"
  ).length;

  const rejectedCount = records.filter(
    (record) => record.status === "rejected"
  ).length;

  const suspiciousCount = records.filter(
    (record) => record.suspicious_flag
  ).length;

  const filteredRecords = records.filter((record) => {

    const matchesSearch =
      record.activity_type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  // Fetch Records
  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        "https://breathe-esg-backend-b7pe.onrender.com/api/records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchAuditLogs = async () => {

    try {

      const response = await axios.get(
        "https://breathe-esg-backend-b7pe.onrender.com/api/audit-logs/"
      );

      setAuditLogs(response.data);

    } catch (error) {

      console.error(error);
    }
  };
  // Load records when page loads
  useEffect(() => {

    fetchRecords();
    fetchAuditLogs();

  }, []);

  // SAP Upload
  const uploadSapFile = async () => {

    if (!sapFile) {
      setMessage("Please select a SAP CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", sapFile);

    try {

      const response = await axios.post(
        "https://breathe-esg-backend-b7pe.onrender.com/api/upload/sap/",
        formData
      );

      setMessage(response.data.message);

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage("SAP upload failed");
    }
  };

  // Utility Upload
  const uploadUtilityFile = async () => {

    if (!utilityFile) {
      setMessage("Please select utility CSV");
      return;
    }

    const formData = new FormData();

    formData.append("file", utilityFile);

    try {

      const response = await axios.post(
        "https://breathe-esg-backend-b7pe.onrender.com/api/upload/utility/",
        formData
      );

      setMessage(response.data.message);

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage("Utility upload failed");
    }
  };

  // Travel Upload
  const uploadTravelFile = async () => {

    if (!travelFile) {
      setMessage("Please select travel JSON");
      return;
    }

    const formData = new FormData();

    formData.append("file", travelFile);

    try {

      const response = await axios.post(
        "https://breathe-esg-backend-b7pe.onrender.com/api/upload/travel/",
        formData
      );

      setMessage(response.data.message);

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage("Travel upload failed");
    }
  };

  const approveRecord = async (id) => {

    try {

      await axios.post(
        `https://breathe-esg-backend-b7pe.onrender.com/api/records/${id}/approve/`
      );

      setMessage("Record approved successfully");

      fetchRecords();
      fetchAuditLogs();

    } catch (error) {

      console.error(error);

      setMessage("Approval failed");
    }
  };

  const rejectRecord = async (id) => {

    try {

      await axios.post(
        `https://breathe-esg-backend-b7pe.onrender.com/api/records/${id}/reject/`
      );

      setMessage("Record rejected successfully");

      fetchRecords();
      fetchAuditLogs();

    } catch (error) {

      console.error(error);

      setMessage("Rejection failed");
    }
  };

  if (!token) {

  window.location.href = "/login";
}
  return (

    <Routes>

      <Route
  path="/login"
  element={<Login />}
/>

      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-100 p-10">

            <div className="flex gap-4 mb-8">

              <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Dashboard
              </Link>

              <Link
                to="/audit-logs"
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Audit Logs
              </Link>

              <button
          onClick={() => {

            localStorage.removeItem(
              "access_token"
            );

            window.location.href = "/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

            </div>

            <h1 className="text-4xl font-bold mb-8">
              ESG Data Ingestion Platform
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

              {/* Total Records */}
              <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-gray-500 text-lg">
                  Total Records
                </h2>

                <p className="text-4xl font-bold mt-2">
                  {totalRecords}
                </p>

              </div>

              {/* Approved */}
              <div className="bg-green-100 p-6 rounded-xl shadow">

                <h2 className="text-green-700 text-lg">
                  Approved
                </h2>

                <p className="text-4xl font-bold mt-2 text-green-800">
                  {approvedCount}
                </p>

              </div>

              {/* Rejected */}
              <div className="bg-red-100 p-6 rounded-xl shadow">

                <h2 className="text-red-700 text-lg">
                  Rejected
                </h2>

                <p className="text-4xl font-bold mt-2 text-red-800">
                  {rejectedCount}
                </p>

              </div>

              {/* Suspicious */}
              <div className="bg-yellow-100 p-6 rounded-xl shadow">

                <h2 className="text-yellow-700 text-lg">
                  Suspicious
                </h2>

                <p className="text-4xl font-bold mt-2 text-yellow-800">
                  {suspiciousCount}
                </p>

              </div>

            </div>

            {
              message && (
                <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
                  {message}
                </div>
              )
            }

            {/* Upload Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* SAP Upload */}
              <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-semibold mb-4">
                  SAP Fuel Data
                </h2>

                <input
                  type="file"
                  className="mb-4"
                  onChange={(e) =>
                    setSapFile(e.target.files[0])
                  }
                />

                <button
                  onClick={uploadSapFile}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Upload SAP CSV
                </button>

              </div>

              {/* Utility Upload */}
              <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-semibold mb-4">
                  Utility Data
                </h2>

                <input
                  type="file"
                  className="mb-4"
                  onChange={(e) =>
                    setUtilityFile(e.target.files[0])
                  }
                />

                <button
                  onClick={uploadUtilityFile}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Upload Utility CSV
                </button>

              </div>

              {/* Travel Upload */}
              <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-semibold mb-4">
                  Travel Data
                </h2>

                <input
                  type="file"
                  className="mb-4"
                  onChange={(e) =>
                    setTravelFile(e.target.files[0])
                  }
                />

                <button
                  onClick={uploadTravelFile}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Upload Travel JSON
                </button>

              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">
              {/* Search */}
              <input
                type="text"
                placeholder="Search activity..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="border p-3 rounded w-full md:w-1/2"
              />

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="border p-3 rounded w-full md:w-1/4"
              >

                <option value="all">
                  All Status
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="rejected">
                  Rejected
                </option>

              </select>

            </div>

            {/* Records Table */}
            <div className="mt-10 bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                Uploaded Emission Records
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>

                    <tr className="bg-gray-200">

                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Activity</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Validation</th>
                      <th className="p-3 text-left">
                        Actions
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredRecords.map((record) => (

                        <tr
                          key={record.id}
                          className="border-b"
                        >

                          <td className="p-3">
                            {record.id}
                          </td>

                          <td className="p-3">
                            {record.category}
                          </td>

                          <td className="p-3">
                            {record.activity_type}
                          </td>

                          <td className="p-3">
                            {record.quantity} {record.unit}
                          </td>

                          <td className="p-3">

                            {
                              record.status === "approved" ? (

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                  Approved
                                </span>

                              ) : record.status === "rejected" ? (

                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                                  Rejected
                                </span>

                              ) : (

                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                                  Pending
                                </span>

                              )
                            }

                          </td>

                          <td className="p-3">

                            {
                              record.suspicious_flag
                                ? "⚠️ Suspicious"
                                : "✅ Valid"
                            }

                          </td>
                          <td className="p-3">

                            {
                              record.locked ? (

                                <span className="text-gray-500 font-semibold">
                                  Locked
                                </span>

                              ) : record.suspicious_flag ? (

                                <button
                                  onClick={() =>
                                    rejectRecord(record.id)
                                  }
                                  className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                  Reject
                                </button>

                              ) : (

                                <div className="flex gap-2">

                                  <button
                                    onClick={() =>
                                      approveRecord(record.id)
                                    }
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                  >
                                    Approve
                                  </button>

                                  <button
                                    onClick={() =>
                                      rejectRecord(record.id)
                                    }
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                  >
                                    Reject
                                  </button>

                                </div>
                              )
                            }

                          </td>
                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>



          </div>
        }
      />

      <Route
        path="/audit-logs"
        element={<AuditLogs />}
      />

    </Routes>
  );
}

export default App;