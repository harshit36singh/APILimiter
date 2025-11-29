import React from 'react'

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold tracking-widest">APILimiter</div>

      <div className="hidden md:flex gap-8 text-sm">
      
        <a href="#">DashBoard</a>
      </div>

      <div className="w-60 h-8 bg-orange">LOGIN/REGISTER</div>
    </div>
  );
}

