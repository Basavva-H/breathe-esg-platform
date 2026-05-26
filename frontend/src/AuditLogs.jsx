import { useEffect, useState } from "react";
import axios from "axios";

import {
  Link,
  Navigate
} from "react-router-dom";

function AuditLogs() {

  const [auditLogs, setAuditLogs] = useState([]);

  const token = localStorage.getItem(
    "access_token"
  );

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

  useEffect(() => {

    if (token) {

      fetchAuditLogs();
    }

  }, []);

  if (!token) {

    return <Navigate to="/login" />;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Navbar */}
      <div className="flex gap-4 mb-8">

        <Link
          to="/"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/audit-logs"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Audit Logs
        </Link>

        {/* Logout */}
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
        Audit Logs
      </h1>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-200">

                <th className="p-3 text-left">
                  Record
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

                <th className="p-3 text-left">
                  Old Status
                </th>

                <th className="p-3 text-left">
                  New Status
                </th>

                <th className="p-3 text-left">
                  Time
                </th>

              </tr>

            </thead>

            <tbody>

              {
                auditLogs.map((log) => (

                  <tr
                    key={log.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {log.record_name}
                    </td>

                    <td className="p-3">
                      {log.action}
                    </td>

                    <td className="p-3 capitalize">
                      {log.old_status}
                    </td>

                    <td className="p-3 capitalize">
                      {log.new_status}
                    </td>

                    <td className="p-3">

                      {
                        new Date(log.changed_at)
                          .toLocaleString()
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
  );
}

export default AuditLogs;