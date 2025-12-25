import React, { useEffect, useState } from "react";
import { Copy, MoreHorizontal, Plus, Check, Eye, EyeOff, Search } from "lucide-react";

const ApiKeysPage = ({ projectId, isDarkMode }) => {
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";
  const inputBgClass = isDarkMode ? "bg-gray-900/50" : "bg-gray-50";

  const token = localStorage.getItem("jwt");

  const copyToClipboard = async (value, id) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert("Copy failed");
    }
  };

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const maskKey = (key) => {
    return key.substring(0, 12) + "•".repeat(20) + key.substring(key.length - 8);
  };

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/apikeys/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setKeys(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    try {
      const res = await fetch(`http://localhost:8080/apikeys/${projectId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Create failed");
      const data = await res.json();

      setNewKey(data.apikey);
      await fetchApiKeys();
    } catch (e) {
      console.error(e);
    }
  };

  const disableApiKey = async (id) => {
    if (!confirm("Are you sure you want to disable this API key?")) return;

    await fetch(`http://localhost:8080/apikeys/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  useEffect(() => {
    if (projectId) fetchApiKeys();
  }, [projectId]);

  const filteredKeys = keys.filter(
    (key) =>
      key.keyValue.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            API Keys
          </h1>
          <p
            className={`text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Manage authentication keys for your API endpoints
          </p>
        </div>

        <button
          onClick={createApiKey}
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
          } flex items-center gap-2`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* New Key Alert */}
      {newKey && (
        <div
          className={`${cardBgClass} border-2 ${
            isDarkMode ? "border-emerald-500/30" : "border-emerald-500/40"
          } rounded-2xl p-6`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`text-base font-medium ${textClass}`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  New API Key Created
                </h3>
                <span
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full ${
                    isDarkMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  Important
                </span>
              </div>

              <p
                className={`text-sm ${textSecondaryClass} mb-4`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Copy your API key now. You won't be able to see it again.
              </p>

              <div
                className={`flex items-center gap-3 p-3 rounded-lg border ${borderClass} ${inputBgClass}`}
              >
                <code
                  className={`flex-1 font-mono text-sm ${textClass} truncate`}
                >
                  {newKey}
                </code>
                <button
                  onClick={() => copyToClipboard(newKey, "new")}
                  className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 ${
                    copiedId === "new"
                      ? isDarkMode
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-700"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  }`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {copiedId === "new" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setNewKey(null)}
              className={`${textSecondaryClass}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden`}>
        {/* Table Header */}
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
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
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
          </div>
        ) : filteredKeys.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <h3
              className={`text-base font-medium ${textClass} mb-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm ? "No matching keys" : "No API keys"}
            </h3>
            <p
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {searchTerm
                ? "Try adjusting your search"
                : "Create your first API key to get started"}
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
                    Key
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Created
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
                {filteredKeys.map((key, idx) => {
                  const isVisible = visibleKeys.has(key.id);
                  return (
                    <tr key={key.id} className={`border-b ${borderClass}`}>
                      <td
                        className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code
                            className={`font-mono text-sm ${textClass}`}
                          >
                            {isVisible ? key.keyValue : maskKey(key.keyValue)}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(key.id)}
                            className={`${textSecondaryClass}`}
                          >
                            {isVisible ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {new Date(key.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                          style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyToClipboard(key.keyValue, key.id)}
                            className={`p-1.5 rounded ${
                              copiedId === key.id
                                ? isDarkMode
                                  ? "text-emerald-400"
                                  : "text-emerald-700"
                                : textSecondaryClass
                            }`}
                          >
                            {copiedId === key.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => disableApiKey(key.id)}
                            className={`p-1.5 rounded ${textSecondaryClass}`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ApiKeysPage;