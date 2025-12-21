import React from "react";
import { useNavigate } from "react-router-dom";

const LandingCTA = ({ isDarkMode, setCurrentView }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const navigate = useNavigate();

  return (
    <section className={`py-24 px-6 lg:px-8 border-t ${borderClass}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* CTA Card */}
        <div className={`relative overflow-hidden rounded-3xl ${
          isDarkMode ? 'bg-gradient-to-br from-[#86efac]/10 to-[#22c55e]/5' : 'bg-gradient-to-br from-[#22c55e]/10 to-[#16a34a]/5'
        } border ${borderClass} p-12 md:p-16`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `radial-gradient(circle, ${isDarkMode ? '#86efac' : '#22c55e'} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex mb-6">
              <div className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${
                isDarkMode ? 'bg-[#86efac]/20 text-[#86efac] border border-[#86efac]/30' : 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30'
              }`}>
                GET STARTED TODAY
              </div>
            </div>

            {/* Heading */}
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${textClass} leading-tight`}>
              Ready to Start
              <br />
              Limiting?
            </h2>

            {/* Description */}
            <p className={`text-lg md:text-xl ${textSecondaryClass} max-w-2xl mx-auto mb-10 leading-relaxed`}>
              Join thousands of developers who trust APILimiter to protect their APIs. Get started for free, no credit card required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigate("/auth")}
                className={`px-10 py-4 rounded-lg text-base font-bold text-black transition-all shadow-xl hover:shadow-2xl hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-[#86efac] hover:bg-[#6ee89d]' 
                    : 'bg-[#22c55e] hover:bg-[#16a34a]'
                }`}
              >
                Create Free Account
              </button>
              
              <button
                onClick={() => navigate("/auth")}
                className={`px-10 py-4 rounded-lg text-base font-semibold border-2 ${
                  isDarkMode ? 'border-[#86efac] text-[#86efac] hover:bg-[#86efac]/10' : 'border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e]/10'
                } transition-all`}
              >
                View Documentation
              </button>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {[
                "✓ Free forever plan",
                "✓ No credit card required",
                "✓ 5-minute setup",
                "✓ 24/7 support"
              ].map((feature, idx) => (
                <div key={idx} className={`flex items-center gap-2 ${textSecondaryClass}`}>
                  <span className={isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className={`text-sm ${textSecondaryClass} mb-4`}>
            Have questions? We're here to help.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'} hover:underline`}>
              Contact Sales
            </a>
            <span className={textSecondaryClass}>•</span>
            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'} hover:underline`}>
              Schedule Demo
            </a>
            <span className={textSecondaryClass}>•</span>
            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'} hover:underline`}>
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;