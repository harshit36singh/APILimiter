// src/pages/ApiKeysPage.jsx
import React, { useEffect, useState } from "react";

const ApiKeysPage = ({ projectId, isDarkMode }) => {
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const textClass = isDarkMode ? "text-white" : "text-black";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";

  const token = localStorage.getItem("jwt");

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      alert("API key copied");
    } catch {
      alert("Copy failed");
    }
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

      // POST returns DTO → apikey
      setNewKey(data.apikey);

      await fetchApiKeys();
    } catch (e) {
      console.error(e);
    }
  };

  const disableApiKey = async (id) => {
    await fetch(`http://localhost:8080/apikeys/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  useEffect(() => {
    if (projectId) fetchApiKeys();
  }, [projectId]);

  return (
    <div>
      <h2 className="text-2xl font-light mb-4">API Keys</h2>
      <p className={`${textClass} mb-6`}>
        Manage API keys for this project.
      </p>

      <button onClick={createApiKey} className="px-4 py-2 border mb-6">
        + Create New API Key
      </button>

      {newKey && (
        <div className={`border ${borderClass} p-4 mb-6`}>
          <p className="text-sm mb-2">New API key (copy now):</p>
          <div className="flex justify-between gap-4">
            <code className={`font-mono break-all ${textClass}`}>
              {newKey}
            </code>
            <button
              onClick={() => copyToClipboard(newKey)}
              className="px-3 py-1 border text-sm"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className={`border ${borderClass}`}>
          {keys.map((key) => (
            <div
              key={key.id}
              className={`flex justify-between p-4 border-b ${borderClass}`}
            >
              <div>
                <p className={`font-mono text-sm ${textClass}`}>
                  {key.keyValue}
                </p>
                <p className="text-xs opacity-60">
                  Created: {new Date(key.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => disableApiKey(key.id)}
                className="border px-3 py-1 text-sm"
              >
                Disable
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiKeysPage;
