import React from "react";
import { useNavigate } from "react-router-dom";

const LandingCTA = ({ isDarkMode, setCurrentView }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-neutral-500" : "text-neutral-600";
  const borderClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";
  const navigate = useNavigate();

  return (
    <section className={`py-32 px-8 lg:px-12 border-t ${borderClass}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* CTA Content */}
        <div className="text-center mb-16">
          {/* Small Label */}
          <div className="mb-8">
            <span 
              className={`text-[13px] uppercase tracking-[0.15em] ${textMutedClass} font-medium`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              Get Started
            </span>
          </div>

          {/* Heading */}
          <h2 
            className={`text-6xl md:text-7xl lg:text-8xl font-normal leading-tight ${textClass} mb-8`}
            style={{ 
              fontFamily: '"Instrument Serif", Georgia, serif',
              letterSpacing: '-0.02em'
            }}
          >
            Ready to Start
            <br />
            <span style={{ fontStyle: 'italic', color: isDarkMode ? '#10b981' : '#059669' }}>
              Limiting?
            </span>
          </h2>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl ${textMutedClass} max-w-2xl mx-auto mb-12 leading-relaxed`}
            style={{ 
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            Join thousands of developers who trust APILimiter to protect their APIs. 
            Get started for free, no credit card required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/auth")}
              className={`px-10 py-5 rounded-full text-[15px] font-medium transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              Create Free Account
            </button>
            
            <button
              onClick={() => navigate("/auth")}
              className={`px-10 py-5 rounded-full text-[15px] font-medium border-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              View Documentation
            </button>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm mb-12">
            {[
              "Free forever plan",
              "No credit card required",
              "5-minute setup",
              "24/7 support"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                  }`}
                />
                <span 
                  className={textMutedClass}
                  style={{ 
                    fontFamily: '"DM Sans", sans-serif',
                    fontVariantNumeric: 'proportional-nums',
                    fontSize: '14px'
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'} mb-12`} />

        {/* Additional Links */}
        <div className="text-center">
          <p 
            className={`text-sm ${textMutedClass} mb-6`}
            style={{ 
              fontFamily: '"DM Sans", sans-serif',
              fontVariantNumeric: 'proportional-nums'
            }}
          >
            Have questions? We're here to help.
          </p>
          <div className="flex items-center justify-center gap-8">
            {[
              { label: 'Contact Sales', href: '#' },
              { label: 'Schedule Demo', href: '#' },
              { label: 'View Pricing', href: '#' }
            ].map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-emerald-400 hover:text-emerald-300' 
                    : 'text-emerald-600 hover:text-emerald-700'
                }`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  fontVariantNumeric: 'proportional-nums'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingCTA;