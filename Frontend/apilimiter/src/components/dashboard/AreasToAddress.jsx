import React from "react";

const AreasToAddress = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const websites = [
    { name: "Google", visits: "High", bar: 90 },
    { name: "YouTube", visits: "Medium", bar: 75 },
    { name: "Instagram", visits: "Medium", bar: 70 },
    { name: "Pinterest", visits: "Low", bar: 60 },
    { name: "Facebook", visits: "Low", bar: 45 },
    { name: "Twitter", visits: "Low", bar: 40 },
  ];

  return (
    <div className={`${cardBgClass} rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${textClass}`}>
          Traffic by Website
        </h3>
      </div>

      <div className="space-y-4">
        {websites.map((website, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm font-medium ${textClass}`}>
                  {website.name}
                </span>
                <span className={`text-xs ${textSecondaryClass}`}>
                  {website.visits}
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${website.bar}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreasToAddress;