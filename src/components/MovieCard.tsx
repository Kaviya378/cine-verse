import React, { useState } from 'react';
import { RecommendationReason } from '../types';
import { Star, Clock, Check } from 'lucide-react';

interface MovieCardProps {
  id: string;
  title: string;
  director: string;
  year: number;
  imageUrl: string;
  rating: number;
  runtime: number;
  genres: string[];
  reason?: RecommendationReason;
  delay: number;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  director,
  year,
  imageUrl,
  rating,
  runtime,
  genres,
  reason,
  delay,
  onClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max rotation is 12 degrees
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
      zIndex: 10
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 1
    });
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'
        }`}
    >
      <div
        className="group relative bg-brand-surface/75 backdrop-blur-md cursor-pointer hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)] border border-white/5 hover:border-brand-primary/40 h-full flex flex-col rounded-[1.8rem] overflow-hidden transform-style-3d hover-glare"
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        data-movie-id={id}
      >
        {/* Spotlight light follow background on card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/0 via-brand-primary/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-90"></div>

          {/* Top badge match score indicator (no click required) */}
          {reason && (
            <div className="absolute top-4 left-4 bg-brand-primary/95 text-white font-black text-[9px] tracking-widest px-3 py-1.5 rounded-full shadow-cinema scale-95 group-hover:scale-100 transition-all duration-300">
              {reason.matchScore.toFixed(0)}% MATCH
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-black font-heading text-white mb-2 leading-tight tracking-tight line-clamp-2 uppercase group-hover:text-brand-accent transition-colors duration-300">{title}</h3>
            <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted space-x-3">
              <span>{year}</span>
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
              <span className="truncate max-w-[140px] uppercase">{director}</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary border border-brand-primary/20">
              <Star className="fill-brand-primary" size={12} />
              <span className="font-black text-[10px] tracking-widest">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-brand-muted text-[10px] font-black uppercase tracking-[0.2em]">
              <Clock size={14} className="mr-2 text-brand-primary" />
              <span>{formatRuntime(runtime)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.slice(0, 3).map(genre => (
              <span
                key={genre}
                className="px-3 py-1 bg-white/5 text-brand-gray text-[9px] font-black uppercase tracking-widest rounded-md border border-white/5 transition-colors hover:bg-white/10"
              >
                {genre}
              </span>
            ))}
          </div>

          {reason && (
            <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
              <ul className="space-y-2">
                {reason.reasons.slice(0, 1).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-4 h-4 rounded-full bg-brand-primary/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                      <Check size={8} className="text-brand-primary" strokeWidth={4} />
                    </div>
                    <span className="text-brand-muted text-[9px] font-bold leading-normal line-clamp-2 uppercase tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;