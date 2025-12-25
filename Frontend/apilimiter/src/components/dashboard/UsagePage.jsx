import React, { useEffect, useState } from "react";
import { Search, Download, MoreHorizontal } from "lucide-react";

const UsagePage = ({ isDarkMode }) => {
  const [usageStats, setUsageStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";
  const inputBgClass = isDarkMode ? "bg-gray-900/50" : "bg-gray-50";

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

  const filteredStats = usageStats.filter((stat) =>
    stat.apikey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
            style={{ animation: "spin 0.8s linear infinite" }}
          ></div>
          <p
            className={`text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Loading...
          </p>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${cardBgClass} border ${borderClass} rounded-2xl p-8 text-center`}
      >
        <h3
          className="text-lg font-medium text-red-500 mb-2"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          Error Loading Data
        </h3>
        <p
          className={`text-sm ${textSecondaryClass}`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className={`text-3xl font-normal mb-2 ${textClass}`}
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              letterSpacing: "-0.02em",
            }}
          >
            Usage Statistics
          </h1>
          <p
            className={`text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Monitor API key usage and activity
          </p>
        </div>

        <button
          className={`px-4 py-2 rounded-lg text-sm ${textSecondaryClass} border ${borderClass} flex items-center gap-2`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center gap-6">
        <div>
          <div
            className={`text-xs ${textSecondaryClass} mb-1`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Total Keys
          </div>
          <div
            className={`text-2xl font-light ${textClass}`}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "-0.02em",
            }}
          >
            {usageStats.length}
          </div>
        </div>

        <div className={`h-8 w-px ${borderClass}`}></div>

        <div>
          <div
            className={`text-xs ${textSecondaryClass} mb-1`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Total Requests
          </div>
          <div
            className={`text-2xl font-light ${textClass}`}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "-0.02em",
            }}
          >
            {getTotalRequests().toLocaleString()}
          </div>
        </div>

        <div className={`h-8 w-px ${borderClass}`}></div>

        <div>
          <div
            className={`text-xs ${textSecondaryClass} mb-1`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Active Keys
          </div>
          <div
            className={`text-2xl font-light ${textClass}`}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: "-0.02em",
            }}
          >
            {usageStats.filter((stat) => stat.totalreq > 0).length}
          </div>
        </div>
      </div>

      {/* Usage Table */}
      <div
        className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden`}
      >
        {/* Table Header with Search */}
        <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondaryClass}`}
            />
            <input
              type="text"
              placeholder="Search keys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${inputBgClass} border ${borderClass} rounded-lg pl-10 pr-4 py-2 text-sm ${textClass} placeholder-gray-500 focus:outline-none`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`text-xs ${textSecondaryClass} px-3 py-2 rounded-lg border ${borderClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Filter
            </button>
            <button
              className={`text-xs ${textSecondaryClass} px-3 py-2 rounded-lg border ${borderClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Sort
            </button>
          </div>
        </div>

        {/* Table */}
        {filteredStats.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <h3
              className={`text-base font-medium ${textClass} mb-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm ? "No matching keys" : "No usage data"}
            </h3>
            <p
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm
                ? "Try adjusting your search"
                : "Usage data will appear here once keys are used"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${borderClass}`}>
                <tr>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    ID
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    API Key
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Total Requests
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Last Used
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredStats.map((stat, idx) => (
                  <tr key={stat.id} className={`border-b ${borderClass}`}>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textClass} font-mono`}
                    >
                      {stat.apikey.substring(0, 20)}...
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {stat.totalreq.toLocaleString()}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {formatDate(stat.lastusedtime)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          stat.totalreq > 0
                            ? isDarkMode
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-emerald-50 text-emerald-700"
                            : isDarkMode
                            ? "bg-gray-800 text-gray-500"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {stat.totalreq > 0 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className={`p-1.5 rounded ${textSecondaryClass}`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredStats.length > 0 && (
          <div
            className={`px-6 py-4 border-t ${borderClass} flex items-center justify-between`}
          >
            <span
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Showing {filteredStats.length} of {usageStats.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1.5 rounded-lg border ${borderClass} text-sm ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg border ${borderClass} text-sm ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsagePage;