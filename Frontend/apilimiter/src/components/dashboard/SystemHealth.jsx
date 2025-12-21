import React from "react";

const SystemHealth = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const sources = [
    { name: "United States", percent: 82.1, color: "#000000" },
    { name: "Canada", percent: 22.8, color: "#22c55e" },
    { name: "Mexico", percent: 13.9, color: "#86efac" },
    { name: "Other", percent: 11.2, color: isDarkMode ? "#374151" : "#e5e7eb" },
  ];

  return (
    <div className={`${cardBgClass} rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${textClass}`}>
          Traffic by Location
        </h3>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke={isDarkMode ? "#1f2937" : "#f3f4f6"}
              strokeWidth="24"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#000000"
              strokeWidth="24"
              strokeDasharray="377"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#22c55e"
              strokeWidth="24"
              strokeDasharray="377"
              strokeDashoffset="-310"
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#86efac"
              strokeWidth="24"
              strokeDasharray="377"
              strokeDashoffset="-336"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        {sources.map((source, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
              ></div>
              <span className={`text-sm ${textClass}`}>{source.name}</span>
            </div>
            <span className={`text-sm font-medium ${textClass}`}>
              {source.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;