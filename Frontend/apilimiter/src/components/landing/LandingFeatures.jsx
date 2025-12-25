import React from "react";

const LandingFeatures = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-neutral-500" : "text-neutral-600";
  const borderClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";
  const cardBgClass = isDarkMode ? "bg-neutral-950" : "bg-neutral-50";

  const features = [
    {
      icon: "⚡",
      title: "Real-Time Monitoring",
      description: "Track every request with millisecond precision. Get instant alerts when thresholds are reached.",
      stat: "< 5ms",
      statLabel: "latency"
    },
    {
      icon: "🛡️",
      title: "Smart Limiting",
      description: "Intelligent rate limiting that adapts to your traffic patterns automatically.",
      stat: "99.9%",
      statLabel: "uptime"
    },
    {
      icon: "🔍",
      title: "Abuse Detection",
      description: "Advanced ML-powered detection to identify and block malicious traffic.",
      stat: "2.8M",
      statLabel: "requests/day"
    }
  ];

  const additionalFeatures = [
    { title: "Custom Rate Limits", desc: "Set different limits per endpoint, user, or API key" },
    { title: "Analytics Dashboard", desc: "Beautiful charts and insights into your API usage" },
    { title: "Webhook Notifications", desc: "Get notified when important events occur" },
    { title: "Multiple Strategies", desc: "Token bucket, sliding window, fixed window" },
    { title: "Redis & In-Memory", desc: "Choose your storage backend" },
    { title: "Easy Integration", desc: "Works with Express, Fastify, Koa" }
  ];

  return (
    <section id="features" className="py-32 px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-24">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p 
                className={`text-[13px] uppercase tracking-[0.15em] ${textMutedClass} font-medium mb-2`}
                style={{ fontVariantNumeric: 'proportional-nums' }}
              >
                Features
              </p>
            </div>
            <div className="md:col-span-9">
              <h2 
                className={`text-5xl md:text-6xl font-normal leading-tight ${textClass} mb-6`}
                style={{ 
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Everything you need to
                <br />
                protect your APIs
              </h2>
              <p 
                className={`text-lg ${textMutedClass} max-w-2xl`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  letterSpacing: '-0.01em'
                }}
              >
                Comprehensive rate limiting with enterprise-grade features built for modern applications.
              </p>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`${cardBgClass} border ${borderClass} rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
            >
              {/* Hover Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode ? 'bg-gradient-to-br from-emerald-500/5 to-transparent' : 'bg-gradient-to-br from-emerald-500/5 to-transparent'
              }`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 
                  className={`text-2xl font-normal mb-4 ${textClass}`}
                  style={{ 
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className={`${textMutedClass} mb-8 leading-relaxed`}
                  style={{ 
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '15px'
                  }}
                >
                  {feature.description}
                </p>

                {/* Stat */}
                <div className={`inline-flex flex-col gap-1 px-4 py-3 rounded-xl border ${borderClass}`}>
                  <div 
                    className={`text-2xl font-light ${textClass}`}
                    style={{ 
                      fontFamily: '"DM Sans", sans-serif',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'proportional-nums'
                    }}
                  >
                    {feature.stat}
                  </div>
                  <div 
                    className={`text-xs uppercase tracking-wider ${textMutedClass}`}
                    style={{ fontVariantNumeric: 'proportional-nums' }}
                  >
                    {feature.statLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={`h-px w-full ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'} mb-20`} />

        {/* Additional Features */}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p 
              className={`text-[13px] uppercase tracking-[0.15em] ${textMutedClass} font-medium`}
              style={{ fontVariantNumeric: 'proportional-nums' }}
            >
              Capabilities
            </p>
          </div>
          <div className="md:col-span-9">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {additionalFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  {/* Checkmark */}
                  <div 
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black' 
                        : 'bg-emerald-600/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 
                      className={`text-base font-medium mb-1 ${textClass}`}
                      style={{ 
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className={`text-sm ${textMutedClass}`}
                      style={{ 
                        fontFamily: '"DM Sans", sans-serif',
                        letterSpacing: '-0.005em'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingFeatures;