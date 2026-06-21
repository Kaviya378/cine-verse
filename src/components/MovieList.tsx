import React from 'react';
import { Movie, RecommendationReason } from '../types';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

interface MovieListProps {
  recommendations: [Movie, RecommendationReason][];
  onSelectMovie?: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ recommendations, onSelectMovie }) => {
  if (recommendations.length === 0) {
    return (
      <div className="bg-brand-surface rounded-[2.5rem] shadow-2xl p-20 text-center border border-white/5 mx-auto max-w-2xl mt-20 transition-all hover:border-brand-primary/20">
        <div className="flex justify-center mb-10">
          <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center shadow-cinema">
            <Film size={48} className="text-brand-primary opacity-90" />
          </div>
        </div>
        <h3 className="text-sm font-black text-white mb-6 tracking-[0.5em] uppercase">START YOUR SEARCH</h3>
        <p className="text-brand-muted text-[11px] font-bold uppercase tracking-widest leading-loose max-w-xs mx-auto">
          SUBMIT YOUR PREFERENCES ABOVE TO POPULATE YOUR PERSONALIZED FEED.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-24 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-20 space-y-6">
        <h2 className="text-sm font-black text-brand-primary text-center tracking-[0.6em] uppercase">CURATED SELECTIONS</h2>
        <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 shadow-[0_0_15px_#6366F1]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map(([movie, reason], index) => (
          <MovieCard
            key={movie.id}
            {...movie}
            reason={reason}
            delay={index * 150} // Staggered animation
            onClick={onSelectMovie ? () => onSelectMovie(movie) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;