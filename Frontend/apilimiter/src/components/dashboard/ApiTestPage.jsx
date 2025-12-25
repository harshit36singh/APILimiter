import React, { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

const ApiTestPage = ({ projectId, project, isDarkMode }) => {
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const token = localStorage.getItem("jwt");

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";
  const inputBgClass = isDarkMode ? "bg-gray-900/50" : "bg-gray-50";

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
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-normal mb-2 ${textClass}`}
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            letterSpacing: "-0.02em",
          }}
        >
          Test API
        </h1>
        <p
          className={`text-sm ${textSecondaryClass}`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          Send test requests to your API endpoint
        </p>
      </div>

      {/* Endpoint Card */}
      <div className={`${cardBgClass} border ${borderClass} rounded-2xl p-6`}>
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-2 py-1 text-xs font-mono rounded ${
              isDarkMode
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            GET
          </span>
          <code
            className={`font-mono text-sm ${textClass}`}
          >
            /apilimiter/{project.shortname}
          </code>
        </div>
        <p
          className={`text-xs ${textSecondaryClass}`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          Base URL: http://localhost:8080
        </p>
      </div>

      {/* Test Form */}
      <div className={`${cardBgClass} border ${borderClass} rounded-2xl p-6`}>
        <div className="mb-6">
          <label
            className={`block text-sm font-medium mb-2 ${textClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            API Key
          </label>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className={`w-full ${inputBgClass} border ${borderClass} rounded-lg px-4 py-2.5 text-sm ${textClass} focus:outline-none`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            <option value="">-- Select API Key --</option>
            {keys.map((k) => (
              <option key={k.id} value={k.stripped}>
                {k.stripped.slice(0, 8)}****{k.stripped.slice(-6)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={testApi}
            disabled={loading || !selectedKey}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white ${
              isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
            } ${
              loading || !selectedKey ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            {loading ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  style={{ animation: "spin 0.8s linear infinite" }}
                ></div>
                Testing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Send Request
              </>
            )}
          </button>

          {(result || error) && (
            <button
              onClick={clearResults}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border ${borderClass} ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Response Metadata */}
      {(result || error) && responseTime && (
        <div className={`${cardBgClass} border ${borderClass} rounded-2xl p-6`}>
          <div className="flex items-center gap-8">
            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Status
              </div>
              <div
                className={`text-base font-mono ${
                  statusCode >= 200 && statusCode < 300
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {statusCode || "Error"}
              </div>
            </div>

            <div className={`h-8 w-px ${borderClass}`}></div>

            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Response Time
              </div>
              <div
                className={`text-base font-mono ${textClass}`}
              >
                {responseTime}ms
              </div>
            </div>

            <div className={`h-8 w-px ${borderClass}`}></div>

            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Size
              </div>
              <div
                className={`text-base font-mono ${textClass}`}
              >
                {result
                  ? `${(JSON.stringify(result).length / 1024).toFixed(2)} KB`
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Response */}
      {result && (
        <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${borderClass}`}>
            <h3
              className={`text-sm font-medium ${textClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Response
            </h3>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre
              className={`text-xs ${textClass} font-mono`}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Error Response */}
      {error && (
        <div className={`${cardBgClass} border-2 border-red-500/30 rounded-2xl overflow-hidden`}>
          <div className="px-6 py-4 border-b border-red-500/30 bg-red-500/5">
            <h3
              className="text-sm font-medium text-red-500"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Error
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-red-400 font-mono">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && !loading && (
        <div
          className={`${cardBgClass} border ${borderClass} border-dashed rounded-2xl p-12 text-center`}
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            } w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
          >
            <Play className={`w-8 h-8 ${textSecondaryClass}`} />
          </div>
          <p
            className={`text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Select an API key and click "Send Request" to test your endpoint
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ApiTestPage;