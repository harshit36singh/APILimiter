import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const KPIGrid = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const kpis = [
    { 
      label: "Views", 
      value: "7,265", 
      change: "+11.01%", 
      trend: "up",
      icon: "📊"
    },
    { 
      label: "Visits", 
      value: "3,671", 
      change: "-0.03%", 
      trend: "down",
      icon: "👥" 
    },
    { 
      label: "New Users", 
      value: "256", 
      change: "+15.03%", 
      trend: "up",
      icon: "✨" 
    },
    { 
      label: "Active Users", 
      value: "2,318", 
      change: "+6.08%", 
      trend: "up",
      icon: "🔥" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`${cardBgClass} rounded-2xl p-6 border ${borderClass} hover:shadow-lg transition-all duration-300`}
        >
          {/* Icon Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={`text-2xl`}>{kpi.icon}</div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              kpi.trend === "up" 
                ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                : isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              {kpi.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {kpi.change}
            </div>
          </div>

          {/* Label */}
          <div className={`text-sm font-medium mb-2 ${textSecondaryClass}`}>
            {kpi.label}
          </div>

          {/* Value */}
          <div className={`text-3xl font-bold ${textClass}`}>
            {kpi.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;