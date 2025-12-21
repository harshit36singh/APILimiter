import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Plus, Moon, Sun } from "lucide-react";

const ProjectListPage = ({ isDarkMode, setIsDarkMode }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";

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
        <div className={textClass}>Loading projects...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Top Bar */}
      <div className={`border-b ${borderClass} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${
              isDarkMode ? "bg-green-500" : "bg-green-400"
            } flex items-center justify-center`}
          >
            <Shield className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className={`text-xl font-light ${textClass}`}>API LIMITER</div>
            <div className={`text-xs ${textSecondaryClass}`}>
              CONTROL SUITE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 border ${borderClass} ${textSecondaryClass}`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 border ${borderClass} text-sm ${textSecondaryClass}`}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-light mb-2 ${textClass}`}>
            Your Projects
          </h1>
          <p className={textSecondaryClass}>
            Select a project to view its dashboard and manage API controls
          </p>
        </div>

        {/* Project Stats */}
        <div className={`grid grid-cols-3 gap-4 mb-8`}>
          <div className={`border ${borderClass} p-6`}>
            <p className={`text-xs mb-2 ${textSecondaryClass}`}>
              TOTAL PROJECTS
            </p>
            <p className={`text-3xl font-light ${textClass}`}>
              {projects.length}
            </p>
          </div>
          <div className={`border ${borderClass} p-6`}>
            <p className={`text-xs mb-2 ${textSecondaryClass}`}>ACTIVE</p>
            <p className={`text-3xl font-light ${textClass}`}>
              {projects.filter((p) => p.status === "active").length}
            </p>
          </div>
          <div className={`border ${borderClass} p-6`}>
            <p className={`text-xs mb-2 ${textSecondaryClass}`}>THIS MONTH</p>
            <p className={`text-3xl font-light ${textClass}`}>2.8M</p>
            <p className={`text-xs ${textSecondaryClass}`}>REQUESTS</p>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className={`border ${borderClass} p-12 text-center`}>
            <Shield
              className={`w-16 h-16 mx-auto mb-4 ${textSecondaryClass}`}
            />
            <h3 className={`text-xl font-light mb-2 ${textClass}`}>
              No Projects Yet
            </h3>
            <p className={`text-sm mb-6 ${textSecondaryClass}`}>
              Create your first project to start managing API limits
            </p>
            <button
              className={`px-6 py-3 ${
                isDarkMode ? "bg-green-500" : "bg-green-400"
              } text-black text-sm flex items-center gap-2 mx-auto`}
            >
              <Plus className="w-4 h-4" />
              CREATE PROJECT
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                className={`border ${borderClass} p-6 cursor-pointer transition-all hover:border-green-400 hover:shadow-lg`}
              >
                {/* Project Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${
                      isDarkMode ? "bg-green-500" : "bg-green-400"
                    } flex items-center justify-center`}
                  >
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <div
                    className={`px-2 py-1 text-xs border ${borderClass} ${
                      project.status === "active"
                        ? isDarkMode
                          ? "text-green-400"
                          : "text-green-600"
                        : textSecondaryClass
                    }`}
                  >
                    {project.status?.toUpperCase() || "ACTIVE"}
                  </div>
                </div>

                {/* Project Name */}
                <h3 className={`text-xl font-light mb-2 ${textClass}`}>
                  {project.name}
                </h3>

                {/* Project URL */}
                <p
                  className={`text-xs mb-4 truncate ${textSecondaryClass}`}
                >
                  {project.api_url}
                </p>

                {/* Project Stats */}
                <div className={`grid grid-cols-2 gap-3 pt-4 border-t ${borderClass}`}>
                  <div>
                    <p className={`text-xs ${textSecondaryClass}`}>REQUESTS</p>
                    <p className={`text-lg font-light ${textClass}`}>
                      {project.requests || "24.5K"}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${textSecondaryClass}`}>RATE</p>
                    <p className={`text-lg font-light ${textClass}`}>
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