import React from "react";

const ActivityCard = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const activities = [
    { name: "Changed the style.", time: "Just now" },
    { name: "Released a new version.", time: "59 minutes ago" },
    { name: "Submitted a bug.", time: "12 hours ago" },
    { name: "Modified A data in Page X.", time: "Today, 11:59 AM" },
    { name: "Deleted a page in Project X.", time: "Feb 2, 2024" },
  ];

  return (
    <div className={`${cardBgClass} rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${textClass}`}>
          Activities
        </h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                idx === 0 
                  ? isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                  : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${textClass} mb-0.5`}>
                {activity.name}
              </p>
              <p className={`text-xs ${textSecondaryClass}`}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;