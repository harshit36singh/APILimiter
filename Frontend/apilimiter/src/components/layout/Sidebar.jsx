import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Key,
  FileText,
  TestTube,
  Settings,
  HelpCircle,
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
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-500";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const bgClass = isDarkMode ? "bg-black" : "bg-gray-50";
  const hoverBgClass = isDarkMode ? "hover:bg-gray-900/50" : "hover:bg-gray-100";

  return (
    <div className={`w-64 ${bgClass} border-r ${borderClass} flex flex-col h-screen`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
          }`}>
            <div className={`w-5 h-5 rounded ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
          </div>
          <div>
            <div className={`text-lg font-bold ${textClass}`}>
              APILimiter
            </div>
            <div className={`text-xs ${textSecondaryClass}`}>
              Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className={`text-xs font-semibold ${textSecondaryClass} uppercase tracking-wider px-3 py-2`}>
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? isDarkMode
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-500/10 text-emerald-700"
                  : `${textSecondaryClass} ${hoverBgClass}`
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-6">
          <div className={`text-xs font-semibold ${textSecondaryClass} uppercase tracking-wider px-3 py-2`}>
            Support
          </div>
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${textSecondaryClass} ${hoverBgClass}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${textSecondaryClass} ${hoverBgClass}`}>
            <HelpCircle className="w-5 h-5" />
            <span>Help Center</span>
          </button>
        </div>
      </nav>

      {/* User Section */}
      <div className={`p-4 border-t ${borderClass}`}>
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${textSecondaryClass} ${hoverBgClass}`}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;