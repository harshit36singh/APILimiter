import React from "react";
import { useNavigate } from "react-router-dom";

const LandingHero = ({ isDarkMode, setCurrentView }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-black" : "bg-white";
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex mb-6">
            <div className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${
              isDarkMode ? 'bg-[#86efac]/10 text-[#86efac] border border-[#86efac]/20' : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
            }`}>
              API RATE LIMITING MADE SIMPLE
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${textClass}`}>
            Streamline Your API
            <br />
            Management with
            <br />
            <span className={isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'}>
              Precision and Ease
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl ${textSecondaryClass} max-w-3xl mx-auto mb-10 leading-relaxed`}>
            Transform your ideas into polished interfaces with APILimiter. Secure your APIs with intelligent rate limiting and real-time monitoring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/auth")}
              className={`px-8 py-4 rounded-lg text-sm font-semibold text-black transition-all shadow-lg ${
                isDarkMode 
                  ? 'bg-[#86efac] hover:bg-[#6ee89d] shadow-[#86efac]/20' 
                  : 'bg-[#22c55e] hover:bg-[#16a34a] shadow-[#22c55e]/20'
              }`}
            >
              Get Started Free
            </button>
            
            <button
              onClick={() => navigate("/auth")}
              className={`px-8 py-4 rounded-lg text-sm font-semibold border ${borderClass} ${textClass} hover:bg-opacity-5 ${
                isDarkMode ? 'hover:bg-white' : 'hover:bg-black'
              } transition-all`}
            >
              See It in Action
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 ${
                    isDarkMode ? 'border-black bg-gray-700' : 'border-white bg-gray-300'
                  } flex items-center justify-center`}
                >
                  <span className="text-xs">👤</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} className={`w-4 h-4 ${isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className={`w-4 h-4 ${textSecondaryClass}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${textClass}`}>4.8+</span>
              <span className={`text-sm ${textSecondaryClass}`}>from 40,000+ users</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className={`rounded-2xl border ${borderClass} ${cardBgClass} shadow-2xl overflow-hidden`}>
          {/* Browser Chrome */}
          <div className={`border-b ${borderClass} px-4 py-3 flex items-center gap-2`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className={`flex-1 mx-4 px-4 py-1 rounded text-xs ${textSecondaryClass} ${
              isDarkMode ? 'bg-[#111111]' : 'bg-gray-100'
            }`}>
              https://apilimiter.io/dashboard
            </div>
          </div>

          {/* Dashboard Content - Image Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Dashboard Preview Content */}
            <div className="relative z-10 p-8">
              <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-white text-2xl font-bold mb-1">API Subscription Manager</h2>
                    <p className="text-gray-400 text-sm">Monitor and manage your API usage and team efficiently.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg border border-white/20">
                      Card header
                    </button>
                    <button className={`px-4 py-2 text-black text-sm rounded-lg font-semibold ${
                      isDarkMode ? 'bg-[#86efac]' : 'bg-[#22c55e]'
                    }`}>
                      Login
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-black rounded-xl p-6 border border-gray-700">
                    <div className="text-gray-400 text-xs mb-2">Total Credits Used</div>
                    <div className="text-white text-3xl font-bold">5000</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
                    <div className="text-gray-400 text-xs mb-2">Remaining Monthly Credits</div>
                    <div className="text-white text-3xl font-bold">10,000</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-gray-700">
                    <div className="text-gray-400 text-xs mb-2">Active Integrations</div>
                    <div className="text-white text-3xl font-bold">15</div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="bg-white/5 rounded-t-xl border border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold">All Subscribed Companies</span>
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        isDarkMode ? 'bg-[#86efac]/20 text-[#86efac]' : 'bg-[#22c55e]/20 text-[#22c55e]'
                      }`}>+ 293 Companies</span>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="px-3 py-1 bg-white/5 border border-gray-700 rounded text-white text-sm placeholder-gray-500"
                      />
                      <button className="px-3 py-1 bg-white/5 border border-gray-700 rounded text-white text-sm">
                        Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay Text for Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-white text-xl font-semibold mb-2">Insert Dashboard Screenshot Here</p>
                <p className="text-gray-400 text-sm">Recommended: 1200x675px, PNG or JPG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;