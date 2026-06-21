import React, { useState } from 'react';
import { ChevronsDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const scrollToPreferences = () => {
    const preferencesSection = document.getElementById('preferences');
    if (preferencesSection) {
      preferencesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/hero-section-image.jpeg"
          alt="Tamil Cinema Background"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-[1500ms] ease-out ${
            imgLoaded ? 'opacity-90 scale-100 blur-none' : 'opacity-0 scale-105 blur-sm'
          }`}
        />
        
        {/* Layered Cinematic Overlays */}
        {/* Layer 1: Semi-transparent Black Overlay (Netflix-style dark mask) */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Layer 2: Soft Crimson Radial Glow centered at the bottom-left of the viewport */}
        <div 
          className="absolute inset-0 z-15 opacity-80"
          style={{
            background: 'radial-gradient(circle at 15% 85%, rgba(139, 92, 246, 0.35) 0%, transparent 60%)'
          }}
        ></div>

        {/* Layer 3: Linear bottom-to-top gradient for blending with the rest of the application */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 z-20"></div>
      </div>

      {/* Cinematic Ambient Lighting Blob */}
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-primary/10 blur-[150px] rounded-full z-10 pointer-events-none"></div>

      {/* Hero Content Area */}
      <div className="container mx-auto px-6 relative z-30 text-center -mt-16">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Main Title with Staggered Entrance and Text Shadow */}
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading leading-[0.85] tracking-tighter text-white opacity-0 animate-slide-up"
            style={{ 
              animationDelay: '150ms', 
              animationFillMode: 'forwards',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            ULTIMATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent drop-shadow-3xl">
              CINE VERSE
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="max-w-2xl text-brand-gray text-xs md:text-sm uppercase tracking-[0.4em] font-bold opacity-0 animate-slide-up"
            style={{ 
              animationDelay: '400ms', 
              animationFillMode: 'forwards',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)'
            }}
          >
            Curated Recommendations • Modern Classics • Hidden Gems
          </p>

          {/* CTA Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full max-w-md mx-auto sm:max-w-none opacity-0 animate-slide-up"
            style={{ 
              animationDelay: '650ms', 
              animationFillMode: 'forwards' 
            }}
          >
            <button
              onClick={scrollToPreferences}
              className="group relative px-12 py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-full font-black uppercase tracking-widest transition-all duration-500 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 flex items-center justify-center gap-4 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Play size={20} fill="currentColor" />
                Get Recommendations
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30">
        <button 
          onClick={scrollToPreferences} 
          className="text-brand-muted hover:text-white transition-all duration-300 p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand-primary/50 group"
        >
          <ChevronsDown size={28} className="animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Hero;