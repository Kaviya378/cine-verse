import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', shortLabel: 'Home', target: 'root' },
    { label: '✨ Discover Movies', shortLabel: 'Discover', target: 'preferences' },
    { label: '🎬 Movie Vault', shortLabel: 'Vault', target: 'movie-vault' }
  ];

  const handleNavClick = (label: string, targetId: string) => {
    setActiveTab(label);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-full border ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-2xl border-brand-primary/20 shadow-[0_15px_40px_rgba(139,92,246,0.15)] py-3 px-6 md:px-10'
          : 'bg-black/30 backdrop-blur-md border-white/5 py-4 px-6 md:px-10'
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer" 
          onClick={() => handleNavClick('Home', 'root')}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            <Film size={26} className="relative z-10 text-brand-primary shadow-cinema transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <h1 className="text-xl md:text-2xl font-black font-heading tracking-tighter text-white">
            CINE<span className="text-brand-primary group-hover:text-brand-accent transition-colors duration-300">VERSE</span>
          </h1>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center">
          <ul className="flex space-x-4 md:space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <li key={item.label} className="relative">
                  <button
                    onClick={() => handleNavClick(item.label, item.target)}
                    className={`relative z-10 px-3 py-2 font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="inline sm:hidden">{item.shortLabel}</span>
                  </button>
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <span className="absolute inset-0 bg-brand-primary/10 rounded-full border border-brand-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.2)] animate-fadeIn"></span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;