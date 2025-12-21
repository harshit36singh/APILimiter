import React from "react";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import LandingFeatures from "./LandingFeatures";
import LandingStats from "./LandingStats";
import LandingCTA from "./LandingCTA";
import LandingFooter from "./LandingFooter";

const LandingPage = ({ isDarkMode, setIsDarkMode, setCurrentView }) => {
  const bgClass = isDarkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]";
  const textClass = isDarkMode ? "text-white" : "text-black";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass}`}>
      <LandingHeader
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setCurrentView={setCurrentView}
      />
      <LandingHero
        isDarkMode={isDarkMode}
        setCurrentView={setCurrentView}
      />
      <LandingFeatures isDarkMode={isDarkMode} />
      <LandingStats isDarkMode={isDarkMode} />
      <LandingCTA
        isDarkMode={isDarkMode}
        setCurrentView={setCurrentView}
      />
      <LandingFooter isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;