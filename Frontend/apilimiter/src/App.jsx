import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./components/auth/PrivateRoute";
import LandingPage from "./components/landing/LandingPage";
import AuthPage from "./components/auth/AuthPage";
import ProjectListPage from "./components/dashboard/ProjectListPage";
import ProjectDashboardPage from "./components/dashboard/DashboardPage";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const sharedThemeProps = { isDarkMode, setIsDarkMode };

  return (
    <Routes>
      <Route path="/" element={<LandingPage {...sharedThemeProps} />} />

      <Route
        path="/auth"
        element={
          <AuthPage
            {...sharedThemeProps}
            authMode={authMode}
            setAuthMode={setAuthMode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            setFormData={setFormData}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProjectListPage {...sharedThemeProps} />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/projects/:projectId"
        element={
          <PrivateRoute>
            <ProjectDashboardPage {...sharedThemeProps} />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/projects/:projectId/:page"
        element={
          <PrivateRoute>
            <ProjectDashboardPage {...sharedThemeProps} />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
