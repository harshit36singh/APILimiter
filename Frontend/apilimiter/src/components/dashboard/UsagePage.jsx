import React, { useEffect, useState } from "react";
import { Activity, Clock, Key } from "lucide-react";

const UsagePage = ({ isDarkMode }) => {
  const [usageStats, setUsageStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";

  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const response = await fetch("http://localhost:8080/usage/lstats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch usage statistics");
        }

        const data = await response.json();
        setUsageStats(data);
      } catch (err) {
        console.error("Error fetching usage stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageStats();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalRequests = () => {
    return usageStats.reduce((sum, stat) => sum + stat.totalreq, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={textClass}>Loading usage statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className={`border ${borderClass} p-6`}>
        <h2 className="text-3xl font-light mb-2">Usage Statistics</h2>
        <p className={`text-sm ${textSecondaryClass}`}>
          Monitor API key usage and activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`border ${borderClass} p-6 ${cardBgClass}`}>
          <div className="flex items-center gap-3 mb-2">
            <Key className={`w-5 h-5 ${textSecondaryClass}`} />
            <h3 className={`text-sm font-medium ${textSecondaryClass}`}>
              Total API Keys
            </h3>
          </div>
          <p className="text-3xl font-light">{usageStats.length}</p>
        </div>

        <div className={`border ${borderClass} p-6 ${cardBgClass}`}>
          <div className="flex items-center gap-3 mb-2">
            <Activity className={`w-5 h-5 ${textSecondaryClass}`} />
            <h3 className={`text-sm font-medium ${textSecondaryClass}`}>
              Total Requests
            </h3>
          </div>
          <p className="text-3xl font-light">{getTotalRequests()}</p>
        </div>

        <div className={`border ${borderClass} p-6 ${cardBgClass}`}>
          <div className="flex items-center gap-3 mb-2">
            <Clock className={`w-5 h-5 ${textSecondaryClass}`} />
            <h3 className={`text-sm font-medium ${textSecondaryClass}`}>
              Active Keys
            </h3>
          </div>
          <p className="text-3xl font-light">
            {usageStats.filter((stat) => stat.totalreq > 0).length}
          </p>
        </div>
      </div>

      {/* Usage Table */}
      <div className={`border ${borderClass} overflow-hidden`}>
        <div className={`p-4 border-b ${borderClass} ${cardBgClass}`}>
          <h3 className="text-lg font-medium">API Key Usage Details</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${cardBgClass} border-b ${borderClass}`}>
              <tr>
                <th
                  className={`text-left p-4 text-sm font-medium ${textSecondaryClass}`}
                >
                  API Key
                </th>
                <th
                  className={`text-left p-4 text-sm font-medium ${textSecondaryClass}`}
                >
                  Total Requests
                </th>
                <th
                  className={`text-left p-4 text-sm font-medium ${textSecondaryClass}`}
                >
                  Last Used
                </th>
                <th
                  className={`text-left p-4 text-sm font-medium ${textSecondaryClass}`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {usageStats.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className={`text-center p-8 ${textSecondaryClass}`}
                  >
                    No usage data available
                  </td>
                </tr>
              ) : (
                usageStats.map((stat) => (
                  <tr
                    key={stat.id}
                    className={`border-b ${borderClass} hover:${cardBgClass} transition-colors`}
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm">
                        {stat.apikey.substring(0, 20)}...
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{stat.totalreq}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm ${textSecondaryClass}`}>
                        {formatDate(stat.lastusedtime)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                          stat.totalreq > 0
                            ? isDarkMode
                              ? "bg-green-900 text-green-300"
                              : "bg-green-100 text-green-800"
                            : isDarkMode
                            ? "bg-gray-800 text-gray-400"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {stat.totalreq > 0 ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsagePage;