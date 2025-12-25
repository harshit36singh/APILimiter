import React from "react";

const LandingFooter = ({ isDarkMode }) => {
  const textClass = isDarkMode ? "text-white" : "text-black";
  const textMutedClass = isDarkMode ? "text-neutral-500" : "text-neutral-600";
  const borderClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Documentation", "API Reference", "Changelog"]
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact", "Support"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Compliance"]
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    }
  ];

  return (
    <footer className={`border-t ${borderClass} ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="mb-6">
                <span 
                  className={`text-lg font-medium tracking-tight ${textClass}`}
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  APILimiter
                </span>
              </div>
              <p 
                className={`${textMutedClass} mb-8 leading-relaxed max-w-xs`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  letterSpacing: '-0.005em'
                }}
              >
                Secure your APIs with intelligent rate limiting. Built for developers, trusted by enterprises.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`w-10 h-10 rounded-full border ${borderClass} flex items-center justify-center ${textMutedClass} transition-all duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-white hover:text-black hover:border-white' 
                        : 'hover:bg-black hover:text-white hover:border-black'
                    }`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-3 gap-8">
                {footerLinks.map((section, idx) => (
                  <div key={idx}>
                    <h3 
                      className={`text-[13px] uppercase tracking-[0.15em] ${textMutedClass} font-medium mb-6`}
                      style={{ fontVariantNumeric: 'proportional-nums' }}
                    >
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a 
                            href="#"
                            className={`text-sm ${textMutedClass} hover:${textClass} transition-colors duration-300`}
                            style={{ 
                              fontFamily: '"DM Sans", sans-serif',
                              fontVariantNumeric: 'proportional-nums'
                            }}
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className={`h-px w-full ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'} mb-8`} />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p 
              className={`text-xs ${textMutedClass}`}
              style={{ 
                fontFamily: '"DM Sans", sans-serif',
                fontVariantNumeric: 'proportional-nums'
              }}
            >
              © {new Date().getFullYear()} APILimiter. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a 
                href="#"
                className={`text-xs ${textMutedClass} hover:${textClass} transition-colors duration-300`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  fontVariantNumeric: 'proportional-nums'
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="#"
                className={`text-xs ${textMutedClass} hover:${textClass} transition-colors duration-300`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  fontVariantNumeric: 'proportional-nums'
                }}
              >
                Terms of Service
              </a>
              <a 
                href="#"
                className={`text-xs ${textMutedClass} hover:${textClass} transition-colors duration-300`}
                style={{ 
                  fontFamily: '"DM Sans", sans-serif',
                  fontVariantNumeric: 'proportional-nums'
                }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;