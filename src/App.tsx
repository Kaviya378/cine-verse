import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PreferenceForm from './components/PreferenceForm';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import SkeletonCard from './components/SkeletonCard';
import MovieModal from './components/MovieModal';
import { Movie, UserPreference, RecommendationReason } from './types';
import { movies } from './data/movieData';
import { getRecommendations } from './utils/recommendationEngine';

function App() {
  const [recommendations, setRecommendations] = useState<[Movie, RecommendationReason][]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePreferenceSubmit = (preferences: UserPreference) => {
    // Get recommendations based on preferences
    const movieRecommendations = getRecommendations(movies, preferences, 6);

    // Set generating/loading state
    setIsGenerating(true);
    setRecommendations([]);

    // Simulate loading for better UX and loading skeleton effect
    setTimeout(() => {
      setRecommendations(movieRecommendations);
      setHasSubmitted(true);
      setIsGenerating(false);

      // Scroll to recommendations
      const recommendationsSection = document.getElementById('recommendations');
      if (recommendationsSection) {
        recommendationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const allGenres = [
    'All',
    'Action',
    'Adventure',
    'Biographical',
    'Comedy',
    'Crime',
    'Drama',
    'Family',
    'Fantasy',
    'Historical',
    'Horror',
    'Political',
    'Romance',
    'Romantic Comedy',
    'Sci-Fi',
    'Thriller'
  ];

  const filteredMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.director.toLowerCase().includes(search.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || 
        (selectedGenre === 'Biographical' && (movie.genres.includes('Biography') || movie.genres.includes('Biographical'))) ||
        (selectedGenre === 'Romantic Comedy' && ((movie.genres.includes('Romance') || movie.genres.includes('Romantic')) && movie.genres.includes('Comedy'))) ||
        (selectedGenre === 'Romance' && (movie.genres.includes('Romance') || movie.genres.includes('Romantic'))) ||
        movie.genres.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => b.year - a.year);

  // Split lists for OTT snap-scrolling categories
  const trending2026 = movies.filter(m => m.year === 2026);
  const topRated = movies.filter(m => m.rating >= 8.5);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-gray selection:bg-brand-primary selection:text-white font-sans overflow-x-hidden relative">
      {/* Global Mouse Follow Spotlight Overlay */}
      <div 
        className="fixed w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none z-[45] transition-all duration-200 hidden md:block"
        style={{
          left: `${mousePos.x - 250}px`,
          top: `${mousePos.y - 250}px`,
        }}
      ></div>

      {/* Orbital drifting mesh elements for cinematic depth */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[180px] rounded-full pointer-events-none z-0 bg-mesh-orbit-1"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none z-0 bg-mesh-orbit-2"></div>

      <Header />
      <main id="root" className="relative z-10">
        <Hero />

        <div className="container mx-auto px-6 pb-20">
          <PreferenceForm onSubmit={handlePreferenceSubmit} />

          {/* AI Recommendation Panel */}
          {(hasSubmitted || isGenerating) && (
            <div id="recommendations" className="mt-28">
              <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                <h2 className="text-sm font-black text-brand-primary text-center tracking-[0.6em] uppercase">CURATED SELECTIONS</h2>
                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 shadow-cinema animate-pulse"></div>
              </div>

              {isGenerating ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <MovieList
                  recommendations={recommendations}
                  onSelectMovie={setSelectedMovie}
                />
              )}
            </div>
          )}

          {/* Movie Vault Section */}
          <div id="movie-vault" className="mt-40 pt-20 border-t border-white/5">
            
            {/* Category 1: 2026 Latest Blockbusters (OTT Snap Scroll Row) */}
            {trending2026.length > 0 && (
              <div className="space-y-6 mb-20">
                <h3 className="text-sm font-black text-white tracking-[0.4em] uppercase border-l-2 border-brand-primary pl-4">
                  🌟 TRENDING 2026 BLOCKBUSTERS
                </h3>
                <div className="flex space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
                  {trending2026.map((movie, index) => (
                    <div key={`trending-${movie.id}`} className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start">
                      <MovieCard
                        {...movie}
                        delay={(index % 4) * 100}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 2: Top Rated Masterpieces (OTT Snap Scroll Row) */}
            {topRated.length > 0 && (
              <div className="space-y-6 mb-24">
                <h3 className="text-sm font-black text-white tracking-[0.4em] uppercase border-l-2 border-brand-primary pl-4">
                  🔥 CRITICALLY ACCLAIMED CLASSICS
                </h3>
                <div className="flex space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
                  {topRated.map((movie, index) => (
                    <div key={`top-${movie.id}`} className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start">
                      <MovieCard
                        {...movie}
                        delay={(index % 4) * 100}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search and Filters Section */}
            <div className="flex flex-col items-center mb-16 pt-10 border-t border-white/5 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tighter uppercase">
                  Movie Vault Gallery
                </h2>
              </div>

              {/* Search and Filter Bar */}
              <div className="w-full max-w-4xl space-y-8">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search by title or director..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-brand-surface/75 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-brand-muted focus:outline-none focus:border-brand-primary/50 transition-all text-xs font-bold tracking-widest uppercase"
                  />
                  <div className="absolute inset-0 bg-brand-primary/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                </div>

                {/* Genre Pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {allGenres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${selectedGenre === genre
                          ? 'bg-brand-primary border-transparent text-white shadow-cinema scale-105'
                          : 'bg-white/5 border-white/5 text-brand-muted hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main searchable grid */}
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMovies.map((movie, index) => (
                  <MovieCard
                    key={`search-${movie.id}`}
                    {...movie}
                    delay={(index % 8) * 100}
                    onClick={() => setSelectedMovie(movie)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center animate-fade-in">
                <p className="text-brand-muted text-xs font-bold uppercase tracking-[0.2em]">No movies found</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Futuristic Detailed Movie Modal overlay */}
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
}

export default App;