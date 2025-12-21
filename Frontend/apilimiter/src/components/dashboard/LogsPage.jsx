import React, { useEffect, useState } from "react";

const LogsPage = ({ project, isDarkMode }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");

  const textClass = isDarkMode ? "text-white" : "text-black";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const textSecondaryClass = isDarkMode
    ? "text-gray-400"
    : "text-gray-600";

  useEffect(() => {
    if (!project?.shortname) return;

    const fetchLogs = async () => {
      try {
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
      } catch (err) {
        console.error("FETCH LOGS ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [project, token]);

  if (loading) {
    return <div className={textClass}>Loading logs...</div>;
  }

  if (error) {
    return (
      <div className="border border-red-500 p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">API Logs</h2>

      <p className={`mb-6 text-sm ${textSecondaryClass}`}>
        Project:{" "}
        <span className="font-mono">{project.shortname}</span>
      </p>

      {logs.length === 0 ? (
        <p className="text-sm opacity-60">No logs found.</p>
      ) : (
        <div className={`border ${borderClass}`}>
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-4 border-b ${borderClass}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-sm">
                  IP: {log.ipaddress}
                </span>

                <span className="text-xs opacity-60">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

              <div className={`text-xs ${textSecondaryClass}`}>
                API Key:&nbsp;
                <span className="font-mono">
                  {log.apikeyval}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogsPage;
