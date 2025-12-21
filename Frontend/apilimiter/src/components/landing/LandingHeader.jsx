import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/api.png"; // adjust name if svg/png


const LandingHeader = ({ isDarkMode, setIsDarkMode, setCurrentView }) => {
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-500" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-50 border-b ${borderClass} ${bgClass} backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
        <img
  src={Logo}
  alt="APILimiter logo"
  className="h-8 w-auto object-contain"
/>


          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium ${textSecondaryClass} hover:${textClass} transition-colors`}>
              Features
            </a>
            <a href="#pricing" className={`text-sm font-medium ${textSecondaryClass} hover:${textClass} transition-colors`}>
              Pricing
            </a>
            <a href="#docs" className={`text-sm font-medium ${textSecondaryClass} hover:${textClass} transition-colors`}>
              Documentation
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-9 h-9 rounded-lg border ${borderClass} flex items-center justify-center hover:bg-opacity-10 ${
                isDarkMode ? 'hover:bg-white' : 'hover:bg-black'
              } transition-all`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => navigate("/auth")}
              className={`px-5 py-2 text-sm font-medium rounded-lg border ${borderClass} ${textClass} hover:bg-opacity-5 ${
                isDarkMode ? 'hover:bg-white' : 'hover:bg-black'
              } transition-all`}
            >
              Login
            </button>
            
            <button
              onClick={() => navigate("/auth")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg text-black transition-all ${
                isDarkMode 
                  ? 'bg-[#86efac] hover:bg-[#6ee89d]' 
                  : 'bg-[#22c55e] hover:bg-[#16a34a]'
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;