import React from "react";

const LandingFeatures = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textSecondaryClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-black" : "bg-white";

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-Time Monitoring",
      description: "Track every request with millisecond precision. Get instant alerts when thresholds are reached.",
      stats: "< 5ms latency"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Smart Limiting",
      description: "Intelligent rate limiting that adapts to your traffic patterns automatically.",
      stats: "99.9% uptime"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Abuse Detection",
      description: "Advanced ML-powered detection to identify and block malicious traffic before it affects your service.",
      stats: "2.8M requests/day"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex mb-4">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
              isDarkMode ? 'bg-[#86efac]/10 text-[#86efac]' : 'bg-[#22c55e]/10 text-[#22c55e]'
            }`}>
              FEATURES
            </div>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
            Everything You Need to
            <br />
            Protect Your APIs
          </h2>
          <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
            Comprehensive rate limiting with enterprise-grade features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`${cardBgClass} border ${borderClass} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                isDarkMode ? 'bg-[#86efac]/10 text-[#86efac]' : 'bg-[#22c55e]/10 text-[#22c55e]'
              } group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${textClass}`}>
                {feature.title}
              </h3>
              <p className={`${textSecondaryClass} mb-4 leading-relaxed`}>
                {feature.description}
              </p>

              {/* Stats Badge */}
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                isDarkMode ? 'bg-[#111111] text-[#86efac]' : 'bg-gray-100 text-[#22c55e]'
              }`}>
                {feature.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features List */}
        <div className={`mt-12 ${cardBgClass} border ${borderClass} rounded-2xl p-8`}>
          <h3 className={`text-2xl font-bold mb-6 ${textClass}`}>More Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Custom Rate Limits", desc: "Set different limits per endpoint, user, or API key" },
              { title: "Analytics Dashboard", desc: "Beautiful charts and insights into your API usage" },
              { title: "Webhook Notifications", desc: "Get notified when important events occur" },
              { title: "Multiple Strategies", desc: "Token bucket, sliding window, fixed window, and more" },
              { title: "Redis & In-Memory", desc: "Choose your storage backend based on your needs" },
              { title: "Easy Integration", desc: "Works with Express, Fastify, Koa, and more" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-[#86efac]' : 'bg-[#22c55e]'
                }`}>
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${textClass}`}>{item.title}</h4>
                  <p className={`text-sm ${textSecondaryClass}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;