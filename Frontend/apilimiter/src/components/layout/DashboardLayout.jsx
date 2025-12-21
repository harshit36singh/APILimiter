import React from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import KPIGrid from "./KPIGrid";
import SystemHealth from "./SystemHealth";
import ActivityCard from "./ActivityCard";
import ExpensesCard from "./ExpensesCard";
import AreasToAddress from "./AreasToAddress";
import AssetUtilization from "./AssetUtilization";

const DashboardPage = ({
  isDarkMode,
  setIsDarkMode,
  activePage,
  setActivePage,
  onLogout,
}) => {
  const bgClass = isDarkMode ? "bg-black" : "bg-white";

  return (
    <div className={`min-h-screen ${bgClass} flex`}>
      <Sidebar
        isDarkMode={isDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6 max-w-7xl">
            <KPIGrid isDarkMode={isDarkMode} />

            <div className="grid grid-cols-3 gap-6">
              <SystemHealth isDarkMode={isDarkMode} />
              <ActivityCard isDarkMode={isDarkMode} />
              <ExpensesCard isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <AreasToAddress isDarkMode={isDarkMode} />
              <AssetUtilization isDarkMode={isDarkMode} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
