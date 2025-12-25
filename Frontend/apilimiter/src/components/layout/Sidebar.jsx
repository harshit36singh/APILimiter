import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Key,
  FileText,
  TestTube,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "usage", icon: BarChart3, label: "Usage" },
  { id: "api-keys", icon: Key, label: "API Keys" },
  { id: "test", icon: TestTube, label: "Test API" },
  { id: "logs", icon: FileText, label: "Logs" },
];

const Sidebar = ({ isDarkMode, activePage, setActivePage, onLogout }) => {
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]";

  return (
    <div className={`w-64 ${bgClass} border-r ${borderClass} flex flex-col h-screen`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-5 h-5 rounded ${
                isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
              }`}
            ></div>
          </div>
          <div>
            <div
              className={`text-base font-medium ${textClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              APILimiter
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-900"
                  : `${textSecondaryClass}`
              }`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`p-4 border-t ${borderClass} space-y-1`}>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${textSecondaryClass}`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${textSecondaryClass}`}
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;