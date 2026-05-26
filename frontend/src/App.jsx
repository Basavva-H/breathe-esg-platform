import { useEffect, useState } from "react";
import axios from "axios";

import {
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import Login from "./Login";
import AuditLogs from "./AuditLogs";

function App() {

  const [sapFile, setSapFile] = useState(null);
  const [utilityFile, setUtilityFile] = useState(null);
  const [travelFile, setTravelFile] = useState(null);

  const [message, setMessage] = useState("");

  const [records, setRecords] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const token = localStorage.getItem(
    "access_token"
  );

  // Dashboard Stats
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

  // Filtered Records
  const filteredRecords = records.filter(
    (record) => {

      const matchesSearch =
        record.activity_type
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all"
          ? true
          : record.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

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

  useEffect(() => {

    if (token) {

      fetchRecords();
    }

  }, []);

  // SAP Upload
  const uploadSapFile = async () => {

    if (!sapFile) {

      setMessage(
        "Please select a SAP CSV file"
      );

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

      setMessage(
        "SAP upload failed"
      );
    }
  };

  // Utility Upload
  const uploadUtilityFile = async () => {

    if (!utilityFile) {

      setMessage(
        "Please select utility CSV"
      );

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

      setMessage(
        "Utility upload failed"
      );
    }
  };

  // Travel Upload
  const uploadTravelFile = async () => {

    if (!travelFile) {

      setMessage(
        "Please select travel JSON"
      );

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

      setMessage(
        "Travel upload failed"
      );
    }
  };

  // Approve Record
  const approveRecord = async (id) => {

    try {

      await axios.post(
        `https://breathe-esg-backend-b7pe.onrender.com/api/records/${id}/approve/`
      );

      setMessage(
        "Record approved successfully"
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage(
        "Approval failed"
      );
    }
  };

  // Reject Record
  const rejectRecord = async (id) => {

    try {

      await axios.post(
        `https://breathe-esg-backend-b7pe.onrender.com/api/records/${id}/reject/`
      );

      setMessage(
        "Record rejected successfully"
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

      setMessage(
        "Rejection failed"
      );
    }
  };

  return (

    <Routes>

      {/* Login Page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={

          token ? (

            <div className="min-h-screen bg-gray-100 p-10">

              {/* Navbar */}
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

                    window.location.href =
                      "/login";
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>

              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold mb-8">
                ESG Data Ingestion Platform
              </h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                <div className="bg-white p-6 rounded-xl shadow">

                  <h2 className="text-gray-500 text-lg">
                    Total Records
                  </h2>

                  <p className="text-4xl font-bold mt-2">
                    {totalRecords}
                  </p>

                </div>

                <div className="bg-green-100 p-6 rounded-xl shadow">

                  <h2 className="text-green-700 text-lg">
                    Approved
                  </h2>

                  <p className="text-4xl font-bold mt-2 text-green-800">
                    {approvedCount}
                  </p>

                </div>

                <div className="bg-red-100 p-6 rounded-xl shadow">

                  <h2 className="text-red-700 text-lg">
                    Rejected
                  </h2>

                  <p className="text-4xl font-bold mt-2 text-red-800">
                    {rejectedCount}
                  </p>

                </div>

                <div className="bg-yellow-100 p-6 rounded-xl shadow">

                  <h2 className="text-yellow-700 text-lg">
                    Suspicious
                  </h2>

                  <p className="text-4xl font-bold mt-2 text-yellow-800">
                    {suspiciousCount}
                  </p>

                </div>

              </div>

              {/* Message */}
              {
                message && (

                  <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
                    {message}
                  </div>
                )
              }

              {/* Upload Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SAP */}
                <div className="bg-white p-6 rounded-xl shadow">

                  <h2 className="text-2xl font-semibold mb-4">
                    SAP Fuel Data
                  </h2>

                  <input
                    type="file"
                    className="mb-4"
                    onChange={(e) =>
                      setSapFile(
                        e.target.files[0]
                      )
                    }
                  />

                  <button
                    onClick={uploadSapFile}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Upload SAP CSV
                  </button>

                </div>

                {/* Utility */}
                <div className="bg-white p-6 rounded-xl shadow">

                  <h2 className="text-2xl font-semibold mb-4">
                    Utility Data
                  </h2>

                  <input
                    type="file"
                    className="mb-4"
                    onChange={(e) =>
                      setUtilityFile(
                        e.target.files[0]
                      )
                    }
                  />

                  <button
                    onClick={uploadUtilityFile}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Upload Utility CSV
                  </button>

                </div>

                {/* Travel */}
                <div className="bg-white p-6 rounded-xl shadow">

                  <h2 className="text-2xl font-semibold mb-4">
                    Travel Data
                  </h2>

                  <input
                    type="file"
                    className="mb-4"
                    onChange={(e) =>
                      setTravelFile(
                        e.target.files[0]
                      )
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

            </div>

          ) : (

            <Navigate to="/login" />

          )
        }
      />

      {/* Audit Logs Page */}
      <Route
        path="/audit-logs"
        element={<AuditLogs />}
      />

    </Routes>
  );
}

export default App;