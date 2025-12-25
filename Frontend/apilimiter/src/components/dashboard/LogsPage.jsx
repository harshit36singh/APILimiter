import React, { useEffect, useState } from "react";
import { Search, Download, RefreshCw, MoreHorizontal } from "lucide-react";

const LogsPage = ({ project, isDarkMode }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem("jwt");

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";
  const inputBgClass = isDarkMode ? "bg-gray-900/50" : "bg-gray-50";

  const fetchLogs = async () => {
    if (!project?.shortname) return;

    try {
      setRefreshing(true);
      const res = await fetch(
        `http://localhost:8080/logs/${project.shortname}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const data = await res.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error("FETCH LOGS ERROR:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [project, token]);

  const filteredLogs = logs.filter(
    (log) =>
      log.ipaddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.apikeyval?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

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
          Error Loading Logs
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
            Request Logs
          </h1>
          <p
            className={`text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Project:{" "}
            <span className="font-mono">
              {project.shortname}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLogs}
            disabled={refreshing}
            className={`px-4 py-2 rounded-lg text-sm ${textSecondaryClass} border ${borderClass} flex items-center gap-2 ${
              refreshing ? "opacity-50" : ""
            }`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>

          <button
            className={`px-4 py-2 rounded-lg text-sm ${textSecondaryClass} border ${borderClass} flex items-center gap-2`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden`}>
        {/* Table Header with Search */}
        <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondaryClass}`}
            />
            <input
              type="text"
              placeholder="Search logs..."
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
        {filteredLogs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <h3
              className={`text-base font-medium ${textClass} mb-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm ? "No matching logs" : "No logs found"}
            </h3>
            <p
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm
                ? "Try adjusting your search"
                : "Logs will appear here once you start making API requests"}
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
                    IP Address
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
                    Timestamp
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Time Ago
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr
                    key={log.id}
                    className={`border-b ${borderClass}`}
                  >
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textClass} font-mono`}
                    >
                      {log.ipaddress}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass} font-mono`}
                    >
                      {log.apikeyval.substring(0, 12)}•••
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {formatTime(log.createdAt)}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {formatRelativeTime(log.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`p-1.5 rounded ${textSecondaryClass}`}
                      >
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
        {filteredLogs.length > 0 && (
          <div
            className={`px-6 py-4 border-t ${borderClass} flex items-center justify-between`}
          >
            <span
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Showing {filteredLogs.length} of {logs.length}
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

export default LogsPage;