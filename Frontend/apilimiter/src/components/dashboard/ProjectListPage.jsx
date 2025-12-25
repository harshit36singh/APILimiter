import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Moon, Sun } from "lucide-react";

const ProjectListPage = ({ isDarkMode, setIsDarkMode }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]";
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-[#111111]" : "bg-white";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await fetch("http://localhost:8080/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.clear();
            navigate("/auth");
            return;
          }
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

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

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Top Bar */}
      <div
        className={`border-b ${borderClass} px-6 py-4 flex items-center justify-between`}
      >
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

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${textSecondaryClass}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg border ${borderClass} text-sm ${textSecondaryClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1
                className={`text-3xl font-normal mb-2 ${textClass}`}
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  letterSpacing: "-0.02em",
                }}
              >
                Your Projects
              </h1>
              <p
                className={`text-sm ${textSecondaryClass}`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Select a project to view its dashboard and manage API controls
              </p>
            </div>

            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
              } flex items-center gap-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>

          {/* Project Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Total Projects
              </div>
              <div
                className={`text-2xl font-light ${textClass}`}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: "-0.02em",
                }}
              >
                {projects.length}
              </div>
            </div>

            <div className={`h-8 w-px ${borderClass}`}></div>

            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Active
              </div>
              <div
                className={`text-2xl font-light ${textClass}`}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: "-0.02em",
                }}
              >
                {projects.filter((p) => p.status === "active").length}
              </div>
            </div>

            <div className={`h-8 w-px ${borderClass}`}></div>

            <div>
              <div
                className={`text-xs ${textSecondaryClass} mb-1`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                This Month
              </div>
              <div
                className={`text-2xl font-light ${textClass}`}
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: "-0.02em",
                }}
              >
                2.8M
                <span className={`text-sm ${textSecondaryClass} ml-1`}>
                  requests
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div
            className={`${cardBgClass} border ${borderClass} border-dashed rounded-2xl p-12 text-center`}
          >
            <div
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              } w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              <div
                className={`w-8 h-8 rounded-lg ${
                  isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/30"
                }`}
              ></div>
            </div>
            <h3
              className={`text-lg font-medium ${textClass} mb-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              No Projects Yet
            </h3>
            <p
              className={`text-sm ${textSecondaryClass} mb-6`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              Create your first project to start managing API limits
            </p>
            <button
              className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white ${
                isDarkMode ? "bg-emerald-500" : "bg-emerald-600"
              } inline-flex items-center gap-2`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                className={`${cardBgClass} border ${borderClass} rounded-2xl p-6 cursor-pointer transition-colors`}
              >
                {/* Project Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded ${
                        isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/30"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "active"
                        ? isDarkMode
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-emerald-50 text-emerald-700"
                        : isDarkMode
                        ? "bg-gray-800 text-gray-500"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {project.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </div>

                {/* Project Name */}
                <h3
                  className={`text-lg font-medium mb-1 ${textClass}`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {project.name}
                </h3>

                {/* Project URL */}
                <p
                  className={`text-xs mb-4 truncate ${textSecondaryClass}`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  {project.api_url}
                </p>

                {/* Project Stats */}
                <div
                  className={`grid grid-cols-2 gap-4 pt-4 border-t ${borderClass}`}
                >
                  <div>
                    <p
                      className={`text-xs ${textSecondaryClass} mb-1`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      Requests
                    </p>
                    <p
                      className={`text-base font-medium ${textClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {project.requests || "24.5K"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs ${textSecondaryClass} mb-1`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      Rate Limit
                    </p>
                    <p
                      className={`text-base font-medium ${textClass}`}
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {project.rate_limit || "100/m"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectListPage;