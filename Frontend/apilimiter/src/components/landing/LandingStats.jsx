import React from "react";

const LandingStats = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-black" : "bg-white";

  const stats = [
    {
      value: "2.8M+",
      label: "Requests Per Day",
      description: "Processing millions of API requests with consistent performance",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable service you can count on, backed by SLA",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: "< 5ms",
      label: "Average Latency",
      description: "Lightning-fast response times that won't slow down your API",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      value: "1.8K+",
      label: "Active Users",
      description: "Trusted by developers and companies worldwide",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className={`py-20 px-6 lg:px-8 border-t ${borderClass}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex mb-4">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
              isDarkMode ? 'bg-[#86efac]/10 text-[#86efac]' : 'bg-[#22c55e]/10 text-[#22c55e]'
            }`}>
              BY THE NUMBERS
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
            Proven Performance
            <br />
            at Scale
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`${cardBgClass} border ${borderClass} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-[#86efac]/10 text-[#86efac]' : 'bg-[#22c55e]/10 text-[#22c55e]'
              } group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>

              {/* Value */}
              <div className={`text-4xl font-bold mb-2 ${textClass}`}>
                {stat.value}
              </div>

              {/* Label */}
              <div className={`text-sm font-semibold mb-2 ${textClass}`}>
                {stat.label}
              </div>

              {/* Description */}
              <p className={`text-xs ${textSecondaryClass} leading-relaxed`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className={`mt-16 ${cardBgClass} border ${borderClass} rounded-2xl p-8 md:p-12`}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className={`w-6 h-6 ${isDarkMode ? 'text-[#86efac]' : 'text-[#22c55e]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className={`text-xl md:text-2xl font-medium mb-6 ${textClass} leading-relaxed`}>
              "APILimiter transformed how we manage our API infrastructure. The setup was seamless, and the real-time monitoring gives us complete visibility into our traffic patterns."
            </blockquote>
            <div className={`flex items-center justify-center gap-4`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-[#86efac]' : 'bg-[#22c55e]'
              }`}>
                <span className="text-black font-bold text-lg">JS</span>
              </div>
              <div className="text-left">
                <div className={`font-semibold ${textClass}`}>Jonathan Smith</div>
                <div className={`text-sm ${textSecondaryClass}`}>CTO, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingStats;