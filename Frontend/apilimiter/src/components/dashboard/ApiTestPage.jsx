import React, { useState, useEffect } from "react";

const ApiTestPage = ({ projectId, project, isDarkMode }) => {
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const token = localStorage.getItem("jwt");

  const textClass = isDarkMode ? "text-white" : "text-black";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/apikeys/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch keys");

        const data = await res.json();

        const normalized = data.map((k) => ({
          id: k.id,
          raw: k.keyValue,
          stripped: k.keyValue.replace("apik_", ""),
        }));

        setKeys(normalized);
      } catch (e) {
        console.error(e);
      }
    };

    if (projectId) fetchKeys();
  }, [projectId, token]);

  /* =========================
     TEST API
     ========================= */
  const testApi = async () => {
    if (!selectedKey) return alert("Select an API key");

    setLoading(true);
    setResult(null);
    setError(null);
    setResponseTime(null);
    setStatusCode(null);

    const startTime = performance.now();

    try {
      const res = await fetch(
        `http://localhost:8080/apilimiter/${project.shortname}`,
        {
          headers: {
            Authorization: `apik_${selectedKey}`,
          },
        }
      );

      const endTime = performance.now();
      setResponseTime((endTime - startTime).toFixed(0));
      setStatusCode(res.status);

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      const endTime = performance.now();
      setResponseTime((endTime - startTime).toFixed(0));
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setError(null);
    setResponseTime(null);
    setStatusCode(null);
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-light mb-6">Test API</h2>

      {/* API Endpoint Display */}
      <div className={`border ${borderClass} p-4 mb-6 ${bgClass}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-1 text-xs font-mono bg-green-500 text-white rounded">
            GET
          </span>
          <code className="font-mono text-sm">
            /apilimiter/{project.shortname}
          </code>
        </div>
        <p className={`text-xs ${secondaryTextClass} mt-2`}>
          Base URL: http://localhost:8080
        </p>
      </div>

      {/* API Key Selection */}
      <div className="mb-6">
        <label className={`block text-sm mb-2 ${secondaryTextClass}`}>
          API Key
        </label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className={`border ${borderClass} ${bgClass} px-3 py-2 w-full ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="" className={bgClass}>
            -- Select API Key --
          </option>
          {keys.map((k) => (
            <option key={k.id} value={k.stripped} className={bgClass}>
              {k.stripped.slice(0, 6)}****{k.stripped.slice(-4)}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={testApi}
          disabled={loading || !selectedKey}
          className={`px-6 py-2 border ${borderClass} ${
            loading || !selectedKey
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Testing...
            </span>
          ) : (
            "Send Request"
          )}
        </button>

        {(result || error) && (
          <button
            onClick={clearResults}
            className={`px-6 py-2 border ${borderClass} hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors`}
          >
            Clear
          </button>
        )}
      </div>

      {/* Response Metadata */}
      {(result || error) && responseTime && (
        <div className={`border ${borderClass} p-4 mb-4 ${bgClass}`}>
          <div className="flex items-center gap-6">
            <div>
              <span className={`text-xs ${secondaryTextClass}`}>Status:</span>
              <span
                className={`ml-2 font-mono text-sm ${
                  statusCode >= 200 && statusCode < 300
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {statusCode || "Error"}
              </span>
            </div>
            <div>
              <span className={`text-xs ${secondaryTextClass}`}>Time:</span>
              <span className={`ml-2 font-mono text-sm ${textClass}`}>
                {responseTime}ms
              </span>
            </div>
            <div>
              <span className={`text-xs ${secondaryTextClass}`}>Size:</span>
              <span className={`ml-2 font-mono text-sm ${textClass}`}>
                {result
                  ? `${(JSON.stringify(result).length / 1024).toFixed(2)} KB`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Success Response */}
      {result && (
        <div className={`border ${borderClass} overflow-hidden`}>
          <div className={`px-4 py-2 border-b ${borderClass} ${bgClass}`}>
            <h3 className="text-sm font-medium">Response</h3>
          </div>
          <div className={`p-4 ${bgClass} overflow-x-auto`}>
            <pre className={`text-xs ${textClass} font-mono`}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Error Response */}
      {error && (
        <div className="border border-red-500 overflow-hidden">
          <div className="px-4 py-2 bg-red-500 bg-opacity-10 border-b border-red-500">
            <h3 className="text-sm font-medium text-red-500">Error</h3>
          </div>
          <div className="p-4 bg-red-500 bg-opacity-5">
            <p className="text-sm text-red-400 font-mono">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && !loading && (
        <div
          className={`border ${borderClass} border-dashed p-12 text-center ${bgClass}`}
        >
          <svg
            className={`mx-auto h-12 w-12 ${secondaryTextClass} mb-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
          <p className={`${secondaryTextClass}`}>
            Select an API key and click "Send Request" to test your API
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiTestPage;