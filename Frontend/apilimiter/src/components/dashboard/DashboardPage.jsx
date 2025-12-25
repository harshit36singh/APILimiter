import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  RefreshCw,
  Download,
} from "lucide-react";

import Sidebar from "../layout/Sidebar";
import LogsPage from "./LogsPage";
import TopBar from "../layout/TopBar";
import ApiKeysPage from "./ApiKeysPage";
import ApiTestPage from "./ApiTestPage";
import UsagePage from "./UsagePage";

const DashboardPage = ({ isDarkMode, setIsDarkMode }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyReport, setDailyReport] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("D");

  const navigate = useNavigate();
  const { projectId, page } = useParams();

  const activePage = page ?? "dashboard";

  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";

  /* =========================
     FETCH PROJECT & ANALYTICS
     ========================= */
  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("/auth");
          return;
        }

        const projectRes = await fetch(
          `http://localhost:8080/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!projectRes.ok) {
          if (projectRes.status === 401) {
            localStorage.clear();
            navigate("/auth");
            return;
          }
          throw new Error("Failed to fetch project");
        }

        const projectData = await projectRes.json();
        setProject(projectData);

        try {
          const dailyRes = await fetch(
            `http://localhost:8080/usagegraph/project/daily/${projectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (dailyRes.ok) {
            const daily = await dailyRes.json();
            setDailyReport(daily);
          }
        } catch (err) {
          console.error("Failed to fetch daily report:", err);
        }
      } catch (err) {
        console.error("FETCH PROJECT ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, navigate]);

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
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
            style={{ animation: "spin 0.8s linear infinite" }}
          ></div>
          <div
            className={`${textSecondaryClass} text-sm`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Loading...
          </div>
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
     DASHBOARD OVERVIEW CONTENT
     ========================= */
  const renderDashboardOverview = () => {
    const totalRequests = dailyReport.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );
    const peakHour =
      dailyReport.length > 0
        ? dailyReport.reduce(
            (max, item) => (item.count > max.count ? item : max),
            dailyReport[0]
          )
        : null;

    const midpoint = Math.floor(dailyReport.length / 2);
    const firstHalf = dailyReport
      .slice(0, midpoint)
      .reduce((sum, item) => sum + item.count, 0);
    const secondHalf = dailyReport
      .slice(midpoint)
      .reduce((sum, item) => sum + item.count, 0);
    const trend =
      firstHalf > 0 ? (((secondHalf - firstHalf) / firstHalf) * 100).toFixed(1) : 0;

    // Prepare line chart data
    const maxCount = Math.max(...dailyReport.map((d) => d.count), 1);
    const chartPoints = dailyReport.slice(-48).map((item, idx) => {
      const height = (item.count / maxCount) * 100;
      const x = (idx / (dailyReport.slice(-48).length - 1)) * 100;
      return { x, y: 100 - height, count: item.count, time: item.buckettime };
    });

    // Create SVG path
    const createPath = (points) => {
      if (points.length === 0) return "";
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      return path;
    };

    const linePathRequests = createPath(chartPoints);
    const areaPathRequests = linePathRequests + ` L 100 100 L 0 100 Z`;

    return (
      <div className="space-y-6 max-w-7xl">
        {/* Project Header */}
        {project && (
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                } flex items-center justify-center`}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${
                    isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/30"
                  }`}
                ></div>
              </div>
              <div>
                <h1
                  className={`text-3xl font-normal mb-1 ${textClass}`}
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDarkMode ? "bg-emerald-400" : "bg-emerald-600"
                      }`}
                    ></div>
                    Active
                  </span>
                  <span
                    className={`text-xs ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Edited 2 hours ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-2 text-sm ${textSecondaryClass} rounded-lg border ${borderClass} flex items-center gap-2`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button
                className={`px-4 py-2 text-sm ${textSecondaryClass} rounded-lg border ${borderClass} flex items-center gap-2`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Metrics Row */}
        <div className="flex items-center gap-6">
          <div>
            <div
              className={`text-xs ${textSecondaryClass} mb-1`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Requests
            </div>
            <div
              className={`text-2xl font-light ${textClass}`}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              {(totalRequests / 1000).toFixed(1)}k
              <span className="text-base text-gray-500 ml-1">/ 10k</span>
            </div>
          </div>

          <div className={`h-8 w-px ${borderClass}`}></div>

          <div>
            <div
              className={`text-xs ${textSecondaryClass} mb-1`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Uptime
            </div>
            <div
              className={`text-2xl font-light ${textClass}`}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              99.2%
              <span className="text-base text-gray-500 ml-1">/ 100%</span>
            </div>
          </div>

          <div className={`h-8 w-px ${borderClass}`}></div>

          <div>
            <div
              className={`text-xs ${textSecondaryClass} mb-1`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Avg Response
            </div>
            <div
              className={`text-2xl font-light ${textClass}`}
              style={{
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              42ms
              <span className="text-base text-gray-500 ml-1">/ 200ms</span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className={`${cardBgClass} border ${borderClass} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className={`text-lg font-normal ${textClass} mb-1`}
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  letterSpacing: "-0.01em",
                }}
              >
                Request Activity
              </h3>
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-0.5 ${isDarkMode ? "bg-blue-400" : "bg-blue-600"}`}></div>
                  <span
                    className={`text-xs ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Requests
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg ${textSecondaryClass}`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                className={`p-2 rounded-lg ${textSecondaryClass}`}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              <div className={`ml-3 border ${borderClass} rounded-lg p-1 flex`}>
                {["D", "W", "M", "Y", "All"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      selectedTimeframe === tf
                        ? isDarkMode
                          ? "bg-gray-800 text-white"
                          : "bg-gray-100 text-gray-900"
                        : textSecondaryClass
                    }`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart with Info Cards */}
          <div className="relative">
            {/* Info Cards on Chart */}
            <div className="absolute top-4 left-12 z-10 flex gap-4">
              <div
                className={`${cardBgClass} border ${borderClass} rounded-lg px-3 py-2 shadow-lg`}
              >
                <div
                  className={`text-xs ${textSecondaryClass} mb-0.5`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {peakHour
                    ? new Date(peakHour.buckettime).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
                <div
                  className={`text-lg font-light ${textClass}`}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    letterSpacing: "-0.01em",
                  }}
                >
                  {totalRequests.toLocaleString()}
                  <span className={`text-xs ml-2 ${textSecondaryClass}`}>
                    +{Math.abs(trend)}%
                  </span>
                </div>
                <div
                  className={`text-xs mt-1 ${
                    trend >= 0 ? "text-emerald-500" : "text-red-500"
                  } flex items-center gap-1`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {trend >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  +{trend >= 0 ? trend : Math.abs(trend)}%
                </div>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="h-64 relative">
              {chartPoints.length > 0 ? (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke={isDarkMode ? "#1f1f1f" : "#f0f0f0"}
                      strokeWidth="0.2"
                    />
                  ))}

                  {/* Area fill */}
                  <path
                    d={areaPathRequests}
                    fill={isDarkMode ? "url(#gradient-dark)" : "url(#gradient-light)"}
                    opacity="0.3"
                  />

                  {/* Line */}
                  <path
                    d={linePathRequests}
                    fill="none"
                    stroke={isDarkMode ? "#60a5fa" : "#3b82f6"}
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="gradient-dark" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient-light" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span
                    className={`text-sm ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    No data available
                  </span>
                </div>
              )}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-2">
              <span
                className={`text-xs ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                2 May, 23
              </span>
              <span
                className={`text-xs ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Jan 17, 24
              </span>
              <span
                className={`text-xs ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Today, Nov 6, 24
              </span>
              <span
                className={`text-xs ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Est. 15 Mar, 25
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className={`${cardBgClass} border ${borderClass} rounded-2xl overflow-hidden`}>
          <div className="px-6 py-4 border-b border-gray-800/50 flex items-center justify-between">
            <h3
              className={`text-base font-normal ${textClass}`}
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                letterSpacing: "-0.01em",
              }}
            >
              Recent Requests
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSidebarChange("logs")}
                className={`text-xs ${textSecondaryClass} px-3 py-1.5 rounded-lg border ${borderClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                View all
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${borderClass}`}>
                <tr>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    ID
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Endpoint
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    IP Address
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Status
                  </th>
                  <th
                    className={`text-left px-6 py-3 text-xs font-medium ${textSecondaryClass}`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "01",
                    endpoint: "/api/v1/users",
                    ip: "192.168.1.1",
                    status: "200 OK",
                    time: "2m ago",
                  },
                  {
                    id: "02",
                    endpoint: "/api/v1/projects",
                    ip: "192.168.1.2",
                    status: "200 OK",
                    time: "5m ago",
                  },
                  {
                    id: "03",
                    endpoint: "/api/v1/auth",
                    ip: "192.168.1.3",
                    status: "429 Rate Limited",
                    time: "12m ago",
                  },
                ].map((row) => (
                  <tr key={row.id} className={`border-b ${borderClass}`}>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {row.id}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textClass} font-mono`}
                    >
                      {row.endpoint}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass} font-mono`}
                    >
                      {row.ip}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          row.status.includes("200")
                            ? isDarkMode
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-emerald-50 text-emerald-700"
                            : isDarkMode
                            ? "bg-red-500/10 text-red-400"
                            : "bg-red-50 text-red-700"
                        }`}
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${textSecondaryClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  /* =========================
     PAGE CONTENT ROUTER
     ========================= */
  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return renderDashboardOverview();
      case "api-keys":
        return <ApiKeysPage projectId={projectId} isDarkMode={isDarkMode} />;
      case "test":
        if (!project) return <div>Loading...</div>;
        return (
          <ApiTestPage
            projectId={projectId}
            project={project}
            isDarkMode={isDarkMode}
          />
        );
      case "usage":
        return <UsagePage isDarkMode={isDarkMode} />;
      case "logs":
        if (!project) return <div>Loading...</div>;
        return <LogsPage project={project} isDarkMode={isDarkMode} />;
      default:
        return (
          <div
            className={`${cardBgClass} border ${borderClass} rounded-2xl p-12 text-center`}
          >
            <p className={textSecondaryClass}>Page not found</p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${bgClass} flex`}>
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

        <main className="flex-1 overflow-y-auto p-8">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;