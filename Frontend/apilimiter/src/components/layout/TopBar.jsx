import React from "react";
import { Search, Bell, Sun, Moon, ChevronDown, ArrowLeft } from "lucide-react";

const TopBar = ({ isDarkMode, setIsDarkMode, projectName, onBackToProjects }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const bgClass = isDarkMode ? "bg-black" : "bg-gray-50";
  const inputBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className={`${bgClass} border-b ${borderClass} px-6 py-4`}>
      <div className="flex items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Back Button */}
          {onBackToProjects && (
            <button
              onClick={onBackToProjects}
              className={`p-2 rounded-xl ${textSecondaryClass} hover:${textClass} transition-colors`}
              title="Back to Projects"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Breadcrumb */}
          <div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onBackToProjects}
                className={`text-sm ${textSecondaryClass} hover:${textClass} transition-colors`}
              >
                Dashboards
              </button>
              <span className={textSecondaryClass}>/</span>
              <span className={`text-sm font-medium ${textClass}`}>
                {projectName || "Default"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`relative hidden md:block`}>
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondaryClass}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`${inputBgClass} border ${borderClass} rounded-xl pl-10 pr-4 py-2 text-sm ${textClass} placeholder-gray-500 focus:outline-none focus:ring-2 ${
                isDarkMode ? 'focus:ring-emerald-500/50' : 'focus:ring-emerald-500/30'
              } w-64`}
            />
            <kbd className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs ${textSecondaryClass} border ${borderClass} rounded`}>
              ⌘K
            </kbd>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border ${borderClass} ${textSecondaryClass} hover:${textClass} transition-colors`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className={`p-2 rounded-xl border ${borderClass} ${textSecondaryClass} hover:${textClass} transition-colors relative`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <button className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${borderClass} hover:bg-opacity-50 transition-colors`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
              isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-500/20 text-emerald-700'
            }`}>
              JC
            </div>
            <div className="hidden md:block text-left">
              <div className={`text-sm font-medium ${textClass}`}>
                Jonathan Cook
              </div>
              <div className={`text-xs ${textSecondaryClass}`}>
                {currentDate}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 ${textSecondaryClass}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;