import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import LogsPage from "./LogsPage";
import TopBar from "../layout/TopBar";
import ActivityCard from "./ActivityCard";
import AreasToAddress from "./AreasToAddress";
import AssetUtilization from "./AssetUtilization";
import ExpensesCard from "./ExpensesCard";
import KPIGrid from "./KPIGrid";
import SystemHealth from "./SystemHealth";
import ApiKeysPage from "./ApiKeysPage";
import ApiTestPage from "./ApiTestPage";
import UsagePage from "./UsagePage";

const DashboardPage = ({ isDarkMode, setIsDarkMode }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { projectId, page } = useParams();

  // ✅ URL is the single source of truth
  const activePage = page ?? "dashboard";

  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-gray-50";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";

  /* =========================
     FETCH PROJECT
     ========================= */
  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("/auth");
          return;
        }

        const res = await fetch(
          `http://localhost:8080/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.clear();
            navigate("/auth");
            return;
          }
          throw new Error("Failed to fetch project");
        }

        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("FETCH PROJECT ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  /* =========================
     SIDEBAR NAVIGATION
     ========================= */
  const handleSidebarChange = (pageId) => {
    if (pageId === "dashboard") {
      navigate(`/dashboard/projects/${projectId}`);
    } else {
      navigate(`/dashboard/projects/${projectId}/${pageId}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${bgClass} flex items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} 
                 style={{ animation: 'spin 1s linear infinite' }}>
              <div className={`absolute inset-0 rounded-2xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'}`}></div>
            </div>
          </div>
          <div className={`${textClass} text-sm font-medium`}>Loading...</div>
        </div>
        
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  /* =========================
     PAGE CONTENT
     ========================= */
  const renderPageContent = () => {
    const cardClass = isDarkMode 
      ? "bg-[#111111] border border-gray-800/50 rounded-3xl shadow-2xl" 
      : "bg-white border border-gray-200 rounded-3xl shadow-lg";
    
    const textSecondaryClass = isDarkMode
      ? "text-gray-400"
      : "text-gray-600";

    switch (activePage) {
      case "dashboard":
        return (
          <div className="space-y-8 max-w-7xl" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            {project && (
              <div className={`${cardClass} p-8 backdrop-blur-xl relative overflow-hidden group transition-all duration-500`}
                   style={{ 
                     boxShadow: isDarkMode 
                       ? '0 20px 60px -10px rgba(0, 0, 0, 0.5)' 
                       : '0 10px 40px -5px rgba(0, 0, 0, 0.1)' 
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = isDarkMode
                       ? '0 30px 80px -10px rgba(59, 130, 246, 0.15)'
                       : '0 20px 60px -5px rgba(0, 0, 0, 0.15)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = isDarkMode
                       ? '0 20px 60px -10px rgba(0, 0, 0, 0.5)'
                       : '0 10px 40px -5px rgba(0, 0, 0, 0.1)';
                   }}>
                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDarkMode ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' : 'bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3'}`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`} 
                         style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                    <span className={`text-xs font-semibold tracking-wider uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      Active Project
                    </span>
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-current via-current to-gray-400 bg-clip-text"
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {project.name}
                  </h2>

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="flex flex-col gap-1.5">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondaryClass}`}>
                        Shortname
                      </span>
                      <span className={`text-base font-medium ${textClass}`}>
                        {project.shortname}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondaryClass}`}>
                        API Endpoint
                      </span>
                      <span className={`text-base font-mono ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} truncate`}>
                        {project.api_url}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ animation: 'fadeIn 0.6s ease-out forwards', animationDelay: '100ms', opacity: 0 }}>
              <KPIGrid isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" 
                 style={{ animation: 'fadeIn 0.6s ease-out forwards', animationDelay: '200ms', opacity: 0 }}>
              <ActivityCard isDarkMode={isDarkMode} />
              <SystemHealth isDarkMode={isDarkMode} />
              <ExpensesCard isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" 
                 style={{ animation: 'fadeIn 0.6s ease-out forwards', animationDelay: '300ms', opacity: 0 }}>
              <AssetUtilization isDarkMode={isDarkMode} />
              <AreasToAddress isDarkMode={isDarkMode} />
            </div>
          </div>
        );

      case "api-keys":
        return (
          <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            <ApiKeysPage
              projectId={projectId}
              isDarkMode={isDarkMode}
            />
          </div>
        );

      case "test":
        if (!project) {
          return (
            <div className="flex items-center justify-center h-64">
              <div className={`${textSecondaryClass} text-sm`}>Loading project...</div>
            </div>
          );
        }

        return (
          <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            <ApiTestPage
              projectId={projectId}
              project={project}
              isDarkMode={isDarkMode}
            />
          </div>
        );

      case "usage":
        return (
          <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            <UsagePage isDarkMode={isDarkMode} />
          </div>
        );

      case "logs":
        if (!project) {
          return (
            <div className="flex items-center justify-center h-64">
              <div className={`${textSecondaryClass} text-sm`}>Loading project...</div>
            </div>
          );
        }

        return (
          <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            <LogsPage
              project={project}
              isDarkMode={isDarkMode}
            />
          </div>
        );

      default:
        return (
          <div className={`flex items-center justify-center h-64 ${cardClass} p-8`}>
            <div className={`${textSecondaryClass}`}>Page not found</div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${bgClass} flex transition-colors duration-300`}>
      <Sidebar
        isDarkMode={isDarkMode}
        activePage={activePage}
        setActivePage={handleSidebarChange}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        <TopBar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          projectName={project?.name}
          onBackToProjects={() => navigate("/dashboard")}
        />

        <main className="flex-1 overflow-y-auto p-8" 
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode ? '#2a2a2a #0a0a0a' : '#d1d5db #f9fafb'
              }}>
          {renderPageContent()}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Custom scrollbar styles */
        main::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        main::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#0a0a0a' : '#f9fafb'};
          border-radius: 10px;
        }

        main::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#2a2a2a' : '#d1d5db'};
          border-radius: 10px;
          border: 2px solid ${isDarkMode ? '#0a0a0a' : '#f9fafb'};
        }

        main::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#3a3a3a' : '#9ca3af'};
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;