import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { X, Star, Clock, Calendar, Film, Check } from 'lucide-react';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (movie) {
      // Trigger open transition on next tick
      const timer = setTimeout(() => setIsOpen(true), 20);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    } else {
      setIsOpen(false);
    }
  }, [movie]);

  if (!movie) return null;

  const handleClose = () => {
    setIsOpen(false);
    // Wait for transition before actual unmount trigger
    setTimeout(onClose, 300);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ambient Blur Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={handleClose}
      ></div>

      {/* Futuristic Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none z-10"></div>

      {/* Modal Dialog Body */}
      <div 
        className={`relative bg-brand-surface w-full max-w-5xl rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden z-20 max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-500 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-brand-primary text-white border border-white/10 hover:border-transparent transition-all duration-300"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Hero poster */}
          <div className="relative md:col-span-5 aspect-[2/3] md:aspect-auto md:h-[600px] overflow-hidden">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-surface via-transparent to-transparent opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/20 to-transparent opacity-90 md:hidden"></div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center space-y-8 relative z-30">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white tracking-tighter uppercase leading-tight">
                {movie.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-brand-muted">
                <span className="flex items-center text-white bg-brand-primary/20 border border-brand-primary/30 px-3 py-1.5 rounded-full">
                  <Star size={12} className="fill-brand-primary text-brand-primary mr-2" />
                  {movie.rating.toFixed(1)} / 10
                </span>
                <span className="flex items-center">
                  <Clock size={12} className="text-brand-primary mr-2" />
                  {formatRuntime(movie.runtime)}
                </span>
                <span className="flex items-center">
                  <Calendar size={12} className="text-brand-primary mr-2" />
                  {movie.year}
                </span>
                <span className="text-white px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                  {movie.language}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-brand-primary uppercase tracking-[0.3em]">SYNOPSIS</h3>
              <p className="text-brand-gray text-xs md:text-sm leading-relaxed font-sans font-medium">
                {movie.description}
              </p>
            </div>

            {/* Director & Cast Grid */}
            <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-6">
              <div>
                <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-2">DIRECTOR</h4>
                <p className="text-white text-xs font-black uppercase tracking-wider">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-2">STARRING</h4>
                <p className="text-white text-xs font-black uppercase tracking-wider leading-relaxed">
                  {movie.actors.join(', ')}
                </p>
              </div>
            </div>

            {/* Genres & Themes */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-4 py-2 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/5"
                  >
                    {genre}
                  </span>
                ))}
                {movie.themes.map(theme => (
                  <span
                    key={theme}
                    className="px-4 py-2 bg-brand-primary/10 text-brand-accent text-[9px] font-black uppercase tracking-widest rounded-lg border border-brand-primary/10"
                  >
                    #{theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
