import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingHero = ({ isDarkMode, setCurrentView }) => {
  const [mounted, setMounted] = useState(false);
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-neutral-500" : "text-neutral-600";
  const borderClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";
  const cardBgClass = isDarkMode ? "bg-neutral-950" : "bg-neutral-50";
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="pt-32 pb-24 px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Content */}
        <div className="max-w-5xl mb-32">
          {/* Title Lines */}
          <div className="mb-12 space-y-1">
            <h1 
              className={`text-[82px] md:text-[120px] lg:text-[140px] font-normal leading-[0.92] tracking-tight ${textClass} transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                fontFamily: '"Instrument Serif", Georgia, serif',
                transitionDelay: '100ms'
              }}
            >
              API RATE
            </h1>
            <h1 
              className={`text-[82px] md:text-[120px] lg:text-[140px] font-normal leading-[0.92] tracking-tight transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                fontFamily: '"Instrument Serif", Georgia, serif',
                color: isDarkMode ? '#10b981' : '#059669',
                fontStyle: 'italic',
                transitionDelay: '200ms'
              }}
            >
              LIMITING
            </h1>
            <h1 
              className={`text-[82px] md:text-[120px] lg:text-[140px] font-normal leading-[0.92] tracking-tight ${textClass} transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                fontFamily: '"Instrument Serif", Georgia, serif',
                transitionDelay: '300ms'
              }}
            >
              SIMPLIFIED
            </h1>
          </div>

          {/* Divider */}
          <div 
            className={`h-px w-full ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'} mb-12 transition-all duration-1000 ${
              mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transformOrigin: 'left', transitionDelay: '400ms' }}
          />

          {/* Introduction */}
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-3">
              <p 
                className={`text-[13px] uppercase tracking-[0.15em] ${textMutedClass} font-medium transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms', fontVariantNumeric: 'proportional-nums' }}
              >
                Introduction
              </p>
            </div>
            <div className="md:col-span-9">
              <p 
                className={`text-[18px] md:text-[20px] leading-relaxed ${textMutedClass} max-w-2xl transition-all duration-1000 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: '600ms',
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: '-0.01em'
                }}
              >
                Secure your APIs with intelligent rate limiting and real-time monitoring. 
                Built for developers who value precision, clarity, and performance.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <button
              onClick={() => navigate("/auth")}
              className={`px-8 py-4 rounded-full text-[14px] font-medium transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              Get Started Free
            </button>
            
            <button
              onClick={() => navigate("/auth")}
              className={`px-8 py-4 rounded-full text-[14px] font-medium border ${borderClass} ${textClass} transition-all duration-300 ${
                isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
              }`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              View Documentation
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div 
          className={`rounded-3xl border ${borderClass} ${cardBgClass} overflow-hidden shadow-2xl transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Browser Chrome */}
          <div className={`border-b ${borderClass} px-6 py-4 flex items-center gap-3`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
            </div>
            <div 
              className={`flex-1 mx-6 px-4 py-2 rounded-lg text-[12px] ${textMutedClass} ${
                isDarkMode ? 'bg-black' : 'bg-white'
              } border ${borderClass}`}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              https://apilimiter.io/dashboard
            </div>
          </div>

          {/* Dashboard Content */}
          <div className={`aspect-[16/10] ${isDarkMode ? 'bg-neutral-900' : 'bg-white'} relative overflow-hidden`}>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}></div>

            {/* Dashboard UI */}
            <div className="relative z-10 p-12">
              <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                  <div>
                    <h2 
                      className={`text-3xl font-normal mb-2 ${textClass}`}
                      style={{ 
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      Dashboard
                    </h2>
                    <p className={`text-sm ${textMutedClass}`} style={{ fontVariantNumeric: 'proportional-nums' }}>
                      Monitor and manage your API usage
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      className={`px-4 py-2 text-sm rounded-full border ${borderClass} ${textClass} ${
                        isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                      } transition-all`}
                      style={{ fontVariantNumeric: 'proportional-nums' }}
                    >
                      Settings
                    </button>
                    <button 
                      className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                        isDarkMode 
                          ? 'bg-white text-black hover:bg-neutral-200' 
                          : 'bg-black text-white hover:bg-neutral-800'
                      }`}
                      style={{ fontVariantNumeric: 'proportional-nums' }}
                    >
                      Upgrade
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { label: 'Total Requests', value: '2.4M', change: '+12.5%' },
                    { label: 'Active APIs', value: '24', change: '+3' },
                    { label: 'Avg Response Time', value: '42ms', change: '-8ms' }
                  ].map((stat, idx) => (
                    <div 
                      key={idx}
                      className={`rounded-2xl p-6 border ${borderClass} ${
                        isDarkMode ? 'bg-black' : 'bg-white'
                      }`}
                    >
                      <div className={`text-xs uppercase tracking-wider ${textMutedClass} mb-3`} style={{ fontVariantNumeric: 'proportional-nums' }}>
                        {stat.label}
                      </div>
                      <div className="flex items-end justify-between">
                        <div 
                          className={`text-4xl font-light ${textClass}`}
                          style={{ 
                            fontFamily: '"DM Sans", sans-serif',
                            letterSpacing: '-0.02em',
                            fontVariantNumeric: 'proportional-nums'
                          }}
                        >
                          {stat.value}
                        </div>
                        <div 
                          className={`text-xs font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                          style={{ fontVariantNumeric: 'proportional-nums' }}
                        >
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Preview */}
                <div className={`rounded-2xl border ${borderClass} ${isDarkMode ? 'bg-black' : 'bg-white'} p-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${textClass}`} style={{ fontVariantNumeric: 'proportional-nums' }}>
                        Recent Activity
                      </span>
                      <span 
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-emerald-400/10 text-emerald-400' : 'bg-emerald-600/10 text-emerald-600'
                        }`}
                        style={{ fontVariantNumeric: 'proportional-nums' }}
                      >
                        Live
                      </span>
                    </div>
                    <button 
                      className={`text-xs ${textMutedClass} hover:${textClass} transition-colors`}
                      style={{ fontVariantNumeric: 'proportional-nums' }}
                    >
                      View All →
                    </button>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between py-3 border-b ${borderClass} last:border-0`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
                          <div>
                            <div className={`text-sm ${textClass} mb-1`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                              /api/v1/users
                            </div>
                            <div className={`text-xs ${textMutedClass}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                              2 minutes ago
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm ${textMutedClass}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                          200 OK
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Placeholder Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-md ${
              isDarkMode ? 'bg-black/50' : 'bg-white/50'
            }`}>
              <div className="text-center">
                <div className="text-6xl mb-6">📊</div>
                <p 
                  className={`text-xl font-medium ${textClass} mb-2`}
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                >
                  Dashboard Preview
                </p>
                <p className={`text-sm ${textMutedClass}`} style={{ fontVariantNumeric: 'proportional-nums' }}>
                  Insert your actual dashboard screenshot
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingHero;