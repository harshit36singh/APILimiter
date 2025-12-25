import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = ({ isDarkMode, setIsDarkMode }) => {
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const textClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-neutral-400" : "text-neutral-600";
  const borderClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";
  const inputBgClass = isDarkMode ? "bg-neutral-900" : "bg-neutral-50";
  const accentColor = isDarkMode ? "#10b981" : "#059669";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert(data.message || "Authentication failed.");
        return;
      }

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("userId", data.Userid);
        localStorage.setItem("username",data.username);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Dark Hero Section */}
      <div 
        className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${
          isDarkMode ? 'bg-black' : 'bg-neutral-900'
        }`}
      >
        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[600px] xl:h-[600px]">
          <div className="absolute inset-0 rounded-full border border-neutral-800 opacity-20"></div>
          <div className="absolute inset-8 rounded-full border border-neutral-800 opacity-20"></div>
          <div className="absolute inset-16 rounded-full border border-neutral-800 opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-8 xl:p-12">
          {/* Top Text */}
          <div>
            <p 
              className="text-neutral-400 text-[13px] xl:text-[14px] max-w-md"
              style={{ 
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '-0.005em'
              }}
            >
              Secure your APIs with intelligent rate limiting.
            </p>
          </div>

          {/* Center - Large Typography */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 
                className="text-white text-[60px] xl:text-[72px] font-normal leading-[0.95] mb-4"
                style={{ 
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Protect
                <br />
                <span style={{ fontStyle: 'italic', color: accentColor }}>
                  your APIs
                </span>
              </h1>
              
              {/* Dashboard Mockup */}
              <div className="mt-10 xl:mt-12 relative">
                <div 
                  className="w-56 h-[420px] xl:w-64 xl:h-[480px] mx-auto rounded-[40px] xl:rounded-[48px] border-[6px] xl:border-8 border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl"
                  style={{
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                  }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 xl:w-32 xl:h-7 bg-neutral-900 rounded-b-3xl"></div>
                  
                  {/* Screen Content */}
                  <div className="p-5 xl:p-6 pt-10 xl:pt-12">
                    {/* Header */}
                    <div className="text-left mb-6 xl:mb-8">
                      <div className="text-white text-2xl xl:text-3xl font-light mb-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        24,891
                      </div>
                      <div className="text-neutral-500 text-[10px] xl:text-xs uppercase tracking-wider">
                        Requests Today
                      </div>
                    </div>

                    {/* Chart Bars */}
                    <div className="space-y-2.5 xl:space-y-3 mb-6 xl:mb-8">
                      {[
                        { height: 60, color: '#10b981', label: 'Mon' },
                        { height: 75, color: '#10b981', label: 'Tue' },
                        { height: 45, color: '#10b981', label: 'Wed' },
                        { height: 85, color: '#059669', label: 'Thu' },
                        { height: 70, color: '#10b981', label: 'Fri' },
                        { height: 40, color: '#10b981', label: 'Sat' },
                        { height: 30, color: '#10b981', label: 'Sun' }
                      ].map((bar, idx) => (
                        <div key={idx} className="flex items-center gap-2 xl:gap-3">
                          <div className="text-neutral-600 text-[9px] xl:text-[10px] w-5 xl:w-6">{bar.label}</div>
                          <div className="flex-1 h-1.5 xl:h-2 bg-neutral-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ 
                                width: `${bar.height}%`,
                                background: `linear-gradient(90deg, ${bar.color}, ${bar.color}dd)`
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Cards */}
                    <div className="grid grid-cols-2 gap-2.5 xl:gap-3">
                      <div className="bg-neutral-900 rounded-xl xl:rounded-2xl p-3 xl:p-4 border border-neutral-800">
                        <div className="text-emerald-400 text-base xl:text-lg font-light mb-0.5 xl:mb-1">99.9%</div>
                        <div className="text-neutral-500 text-[8px] xl:text-[9px] uppercase">Uptime</div>
                      </div>
                      <div className="bg-neutral-900 rounded-xl xl:rounded-2xl p-3 xl:p-4 border border-neutral-800">
                        <div className="text-emerald-400 text-base xl:text-lg font-light mb-0.5 xl:mb-1">&lt;5ms</div>
                        <div className="text-neutral-500 text-[8px] xl:text-[9px] uppercase">Response</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Circle Indicator */}
                <div className="absolute -bottom-6 xl:-bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 border-neutral-800 bg-neutral-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full" style={{ background: accentColor }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom - Back Button */}
          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-[13px] xl:text-sm"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - White Form Section */}
      <div 
        className={`w-full lg:w-1/2 flex flex-col h-screen ${
          isDarkMode ? 'bg-neutral-950' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 lg:p-8">
          {/* Logo - Show on mobile, hide on desktop */}
          <button
            onClick={() => navigate("/")}
            className={`lg:hidden text-lg font-medium ${textClass}`}
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            APILimiter
          </button>

          {/* Desktop - Empty space */}
          <div className="hidden lg:block"></div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border ${borderClass} flex items-center justify-center transition-colors`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Sign Up / Sign In Toggle */}
            <button
              onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setFormData({ username: "", email: "", password: "" });
              }}
              className={`px-4 py-2 text-[13px] sm:text-sm font-medium rounded-full ${textClass}`}
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {authMode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-20 overflow-y-auto">
          <div className="w-full max-w-md py-4">
            {/* Form Title */}
            <h2 
              className={`text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal leading-tight mb-2 ${textClass}`}
              style={{ 
                fontFamily: '"Instrument Serif", Georgia, serif',
                letterSpacing: '-0.02em'
              }}
            >
              {authMode === "login" ? "Sign In" : "Sign Up"}
            </h2>
            <p 
              className={`text-[14px] sm:text-[15px] mb-8 ${textMutedClass}`}
              style={{ 
                fontFamily: '"DM Sans", sans-serif',
                letterSpacing: '-0.005em'
              }}
            >
              {authMode === "login" 
                ? "Welcome back! Please enter your credentials" 
                : "Create your account to get started"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Name Field */}
              <div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  placeholder={authMode === "login" ? "Username" : "Name"}
                  className={`w-full px-5 py-3.5 rounded-2xl ${inputBgClass} ${textClass} text-[14px] sm:text-[15px] border ${borderClass} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0`}
                  style={{ 
                    fontFamily: '"DM Sans", sans-serif',
                    letterSpacing: '-0.005em',
                    boxShadow: isDarkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                />
              </div>

              {/* Email Field (Register Only) */}
              {authMode === "register" && (
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Email"
                    className={`w-full px-5 py-3.5 rounded-2xl ${inputBgClass} ${textClass} text-[14px] sm:text-[15px] border ${borderClass} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0`}
                    style={{ 
                      fontFamily: '"DM Sans", sans-serif',
                      letterSpacing: '-0.005em',
                      boxShadow: isDarkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  />
                </div>
              )}

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={5}
                  placeholder="Password"
                  className={`w-full px-5 py-3.5 pr-12 rounded-2xl ${inputBgClass} ${textClass} text-[14px] sm:text-[15px] border ${borderClass} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0`}
                  style={{ 
                    fontFamily: '"DM Sans", sans-serif',
                    letterSpacing: '-0.005em',
                    boxShadow: isDarkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${textMutedClass} hover:${textClass} transition-colors`}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              {/* Forgot Password (Login Only) */}
              {authMode === "login" && (
                <div className="text-left pt-1">
                  <a 
                    href="#"
                    className="text-[12px] sm:text-[13px] font-medium transition-colors"
                    style={{ 
                      fontFamily: '"DM Sans", sans-serif',
                      color: accentColor
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-white text-[14px] sm:text-[15px] font-medium transition-all duration-300 shadow-lg mt-6"
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
                  boxShadow: `0 4px 20px ${accentColor}40`
                }}
              >
                {authMode === "login" ? "Sign In →" : "Create Account →"}
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className={`flex-1 h-px ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
              <span 
                className={`text-[11px] sm:text-[12px] uppercase tracking-wider ${textMutedClass}`}
                style={{ fontVariantNumeric: 'proportional-nums' }}
              >
                or
              </span>
              <div className={`flex-1 h-px ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                { name: 'Google', icon: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' },
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
              ].map((social, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`py-3.5 rounded-2xl border ${borderClass} flex items-center justify-center transition-colors ${
                    isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-50'
                  }`}
                  aria-label={social.name}
                  style={{
                    boxShadow: isDarkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                >
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${textClass}`} fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-5 sm:p-6 lg:p-8 border-t ${borderClass}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p 
              className={`text-[11px] sm:text-[12px] ${textMutedClass}`}
              style={{ 
                fontFamily: '"DM Sans", sans-serif',
                fontVariantNumeric: 'proportional-nums'
              }}
            >
              © 2025 APILimiter Inc.
            </p>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <a 
                href="#"
                className={`text-[11px] sm:text-[12px] ${textMutedClass} hover:${textClass} transition-colors`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Contact Us
              </a>
              <a 
                href="#"
                className={`text-[11px] sm:text-[12px] ${textMutedClass} hover:${textClass} transition-colors`}
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                English
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Back Button */}
      <button
        onClick={() => navigate("/")}
        className={`lg:hidden fixed bottom-6 left-6 w-11 h-11 rounded-full ${
          isDarkMode ? 'bg-neutral-900' : 'bg-white'
        } border ${borderClass} flex items-center justify-center shadow-lg z-50`}
      >
        <svg className={`w-5 h-5 ${textClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
    </div>
  );
};

export default AuthPage;