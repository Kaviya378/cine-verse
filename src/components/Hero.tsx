import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { FadeIn, Stagger } from './Anim';

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
        
        {/* Layer 2: Soft Cosmic Radial Glow centered at the bottom-left of the viewport */}
        <div 
          className="absolute inset-0 z-15 opacity-80"
          style={{
            background: 'radial-gradient(circle at 15% 85%, rgba(229, 9, 20, 0.25) 0%, rgba(178, 7, 16, 0.15) 40%, rgba(255, 61, 71, 0.05) 70%, transparent 100%)'
          }}
        ></div>

        {/* Layer 3: Linear bottom-to-top gradient for blending with the rest of the application */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 z-20"></div>
      </div>

      {/* Cinematic Ambient Lighting Blob */}
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-secondary/10 blur-[150px] rounded-full z-10 pointer-events-none"></div>

      {/* Hero Content Area */}
      <div className="container mx-auto px-6 relative z-30 text-center -mt-16">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Main Title with Staggered Entrance and Text Shadow */}
          <Stagger>
            <FadeIn delay={0.15}>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading leading-[0.85] tracking-tighter text-white">
                <span style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.5)' }}>
                  ULTIMATE
                </span>
                <br />
                <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(229,9,20,0.6)]" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.95)' }}>
                  CINE VERSE
                </span>
              </h1>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={0.4} className="max-w-2xl mx-auto">
              <p className="text-brand-gray text-xs md:text-sm uppercase tracking-[0.4em] font-bold" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)' }}>
                Curated Recommendations • Modern Classics • Hidden Gems
              </p>
            </FadeIn>

            {/* CTA Action Buttons */}
            <FadeIn delay={0.65}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 w-full max-w-md mx-auto sm:max-w-none">
                <button
                  onClick={scrollToPreferences}
                  className="group relative px-12 py-5 bg-ai-gradient text-white rounded-full font-black uppercase tracking-widest transition-all duration-500 shadow-cinema hover:shadow-[0_0_50px_rgba(229,9,20,0.6)] transform hover:-translate-y-1 flex items-center justify-center gap-4 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Play size={20} fill="currentColor" />
                    Get Recommendations
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            </FadeIn>
          </Stagger>

        </div>
      </div>

    </div>
  );
};

export default Hero;