import React from "react";
import { Sun, Moon, ArrowLeft } from "lucide-react";

const TopBar = ({ isDarkMode, setIsDarkMode, projectName, onBackToProjects }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]";

  const username = localStorage.getItem("username") || "User";
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <header className={`${bgClass} border-b ${borderClass} px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Left Section - Breadcrumb */}
        <div className="flex items-center gap-4">
          {onBackToProjects && (
            <button
              onClick={onBackToProjects}
              className={`p-2 rounded-lg ${textSecondaryClass}`}
              title="Back to Projects"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToProjects}
              className={`text-sm ${textSecondaryClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Projects
            </button>
            <span className={textSecondaryClass}>/</span>
            <span
              className={`text-sm font-medium ${textClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {projectName || "Dashboard"}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${textSecondaryClass}`}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {initials}
            </div>
            <div className="hidden md:block">
              <div
                className={`text-sm font-medium ${textClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {username}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;