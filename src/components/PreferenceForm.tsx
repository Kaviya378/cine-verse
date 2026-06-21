import React, { useState } from 'react';
import { genres, directors, actors, themes } from '../data/movieData';
import { UserPreference } from '../types';
import { Film, User, Tag, Check } from 'lucide-react';

interface PreferenceFormProps {
  onSubmit: (preferences: UserPreference) => void;
}

const currentYear = new Date().getFullYear();

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState<UserPreference>({
    genres: [],
    directors: [],
    actors: [],
    yearRange: [2000, currentYear],
    themes: []
  });

  const [activeTab, setActiveTab] = useState<string>('genres');

  const handleGenreChange = (genre: string) => {
    setPreferences(prev => {
      if (prev.genres.includes(genre)) {
        return { ...prev, genres: prev.genres.filter(g => g !== genre) };
      } else {
        return { ...prev, genres: [...prev.genres, genre] };
      }
    });
  };

  const handleDirectorChange = (director: string) => {
    setPreferences(prev => {
      if (prev.directors.includes(director)) {
        return { ...prev, directors: prev.directors.filter(d => d !== director) };
      } else {
        return { ...prev, directors: [...prev.directors, director] };
      }
    });
  };

  const handleActorChange = (actor: string) => {
    setPreferences(prev => {
      if (prev.actors.includes(actor)) {
        return { ...prev, actors: prev.actors.filter(a => a !== actor) };
      } else {
        return { ...prev, actors: [...prev.actors, actor] };
      }
    });
  };

  const handleThemeChange = (theme: string) => {
    setPreferences(prev => {
      if (prev.themes.includes(theme)) {
        return { ...prev, themes: prev.themes.filter(t => t !== theme) };
      } else {
        return { ...prev, themes: [...prev.themes, theme] };
      }
    });
  };

  const handleYearRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(event.target.value);
    setPreferences(prev => {
      const newYearRange = [...prev.yearRange];
      newYearRange[index] = value;
      return { ...prev, yearRange: [newYearRange[0], newYearRange[1]] as [number, number] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      preferences.genres.length === 0 &&
      preferences.directors.length === 0 &&
      preferences.actors.length === 0 &&
      preferences.themes.length === 0
    ) {
      alert('Please select at least one preference to get recommendations.');
      return;
    }
    onSubmit(preferences);
  };

  const CheckboxItem = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className={`group cursor-pointer relative flex items-center p-4 rounded-2xl border transition-all duration-500 overflow-hidden ${checked
      ? 'bg-brand-primary/20 border-brand-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]'
      : 'bg-white/5 border-white/10 hover:border-brand-primary/50 hover:bg-white/10'
      }`}>
      <div className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center mr-4 transition-all duration-500 ${checked
        ? 'bg-brand-primary text-white scale-110 shadow-lg'
        : 'bg-white/10 text-transparent border border-white/20'
        }`}>
        <Check size={12} strokeWidth={4} />
      </div>
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span className={`relative z-10 text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${checked ? 'text-white' : 'text-brand-muted group-hover:text-white'}`}>
        {label}
      </span>
    </label>
  );

  const tabs = [
    { id: 'genres', label: 'GENRES', icon: Film },
    { id: 'people', label: 'DIRECTORS & ACTORS', icon: User },
    { id: 'other', label: 'THEME AND YEAR', icon: Tag },
  ];

  return (
    <div id="preferences" className="bg-brand-surface backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(15,23,42,0.3)] p-10 md:p-16 max-w-6xl mx-auto -mt-32 relative z-20 border border-white/5 overflow-hidden">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tighter uppercase">PREFERENCES</h2>
        <div className="h-1 w-24 bg-brand-primary mx-auto rounded-full shadow-cinema"></div>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex items-center px-10 py-5 rounded-full font-black text-[10px] tracking-[0.3em] transition-all duration-500 ${activeTab === tab.id
              ? 'bg-brand-primary text-white shadow-cinema scale-105'
              : 'bg-white/5 text-brand-muted border border-white/5 hover:border-white/20 hover:text-white'
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} className="mr-3" />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div className="min-h-[400px]">
          {/* Genres Tab */}
          <div className={activeTab === 'genres' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map(genre => (
                <CheckboxItem
                  key={genre}
                  label={genre}
                  checked={preferences.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
              ))}
            </div>
          </div>

          {/* People Tab */}
          <div className={activeTab === 'people' ? 'block' : 'hidden'}>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-xs font-black text-brand-gray uppercase tracking-[0.4em] flex items-center">
                  DIRECTORS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {directors.map(director => (
                    <CheckboxItem
                      key={director}
                      label={director}
                      checked={preferences.directors.includes(director)}
                      onChange={() => handleDirectorChange(director)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-black text-brand-gray uppercase tracking-[0.4em] flex items-center">
                  ACTORS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {actors.map(actor => (
                    <CheckboxItem
                      key={actor}
                      label={actor}
                      checked={preferences.actors.includes(actor)}
                      onChange={() => handleActorChange(actor)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Tab */}
          <div className={activeTab === 'other' ? 'block' : 'hidden'}>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-xs font-black text-brand-gray uppercase tracking-[0.4em]">THEMES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {themes.map(theme => (
                    <CheckboxItem
                      key={theme}
                      label={theme}
                      checked={preferences.themes.includes(theme)}
                      onChange={() => handleThemeChange(theme)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 shadow-2xl">
                <h3 className="text-xs font-black text-brand-gray uppercase tracking-[0.4em] mb-12 flex items-center">
                  YEAR RANGE
                </h3>
                <div className="space-y-16">
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray">FROM</span>
                      <span className="text-3xl font-black text-brand-primary">{preferences.yearRange[0]}</span>
                    </div>
                    <input
                      type="range"
                      min="1950"
                      max={currentYear}
                      value={preferences.yearRange[0]}
                      onChange={e => handleYearRangeChange(e, 0)}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray">TO</span>
                      <span className="text-3xl font-black text-brand-primary">{preferences.yearRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="1950"
                      max={currentYear}
                      value={preferences.yearRange[1]}
                      onChange={e => handleYearRangeChange(e, 1)}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-white/5 flex justify-center">
          <button
            type="submit"
            className="group relative px-16 py-6 bg-brand-primary text-white font-black text-sm uppercase tracking-[0.3em] rounded-full shadow-cinema hover:shadow-[0_0_80px_rgba(139,92,246,0.5)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              GENERATE RESULTS
              <Film className="ml-4" size={20} />
            </span>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;