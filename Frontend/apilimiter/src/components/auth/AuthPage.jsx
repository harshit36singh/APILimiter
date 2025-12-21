import React from "react";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = ({
  authMode,
  setAuthMode,
  showPassword,
  setShowPassword,
  formData,
  setFormData,
}) => {
  const navigate = useNavigate();

  // Build correct payload for backend
  const buildPayload = () => {
    if (authMode === "login") {
      return {
        username: formData.username,
        password: formData.password,
      };
    }

    return {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
  };

  // Submit handler
  const handleSubmit = async () => {
    const url =
      authMode === "login"
        ? "http://localhost:8080/auth/login"
        : "http://localhost:8080/auth/register";

    const payload = buildPayload();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("LOGIN RESPONSE:", data);
        alert(data.message || "Authentication failed.");
        return;
      }

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("userId", data.Userid);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="auth-page">
      {/* Back to Home Button */}
      <button 
        className="back-to-home"
        onClick={() => navigate("/")}
      >
        <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <div className={`auth-container ${authMode === "register" ? "right-panel-active" : ""}`} id="auth-container">
        
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <AuthForm
            authMode="register"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <AuthForm
            authMode="login"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button 
                className="ghost" 
                onClick={() => setAuthMode("login")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Explorer!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button 
                className="ghost" 
                onClick={() => setAuthMode("register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;