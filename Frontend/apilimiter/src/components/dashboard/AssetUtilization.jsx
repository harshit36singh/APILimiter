import React from "react";

const AssetUtilization = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const devices = [
    { name: "Linux", value: 15, color: isDarkMode ? "#6366f1" : "#8b5cf6" },
    { name: "Mac", value: 25, color: "#22c55e" },
    { name: "iOS", value: 20, color: "#000000" },
    { name: "Windows", value: 28, color: "#3b82f6" },
    { name: "Android", value: 12, color: isDarkMode ? "#9ca3af" : "#d1d5db" },
    { name: "Other", value: 22, color: "#86efac" },
  ];

  const maxValue = Math.max(...devices.map(d => d.value));

  return (
    <div className={`${cardBgClass} rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${textClass}`}>
          Traffic by Device
        </h3>
      </div>

      <div className="space-y-6">
        {devices.map((device, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${textClass}`}>
                {device.name}
              </span>
              <span className={`text-sm font-medium ${textClass}`}>
                {device.value}K
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(device.value / maxValue) * 100}%`,
                  backgroundColor: device.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetUtilization;