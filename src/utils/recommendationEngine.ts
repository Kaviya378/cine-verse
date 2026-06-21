import { Movie, UserPreference, RecommendationReason } from '../types';

export const calculateMatchScore = (movie: Movie, preferences: UserPreference): number => {
  let score = 0;
  const { genres, directors, actors, yearRange, themes } = preferences;

  // 1. Strict Year Filtering (Filter step)
  const [minYear, maxYear] = yearRange;
  if (movie.year < minYear || movie.year > maxYear) {
    return 0; // Filter out if outside year range
  }

  // 2. Genre Match (High importance: 40%)
  const matchedGenres = movie.genres.filter(g => genres.includes(g));
  if (genres.length > 0) {
    // Weighted by how many of User's preferred genres this movie has
    score += (matchedGenres.length / Math.max(1, movie.genres.length)) * 40;
    // Plus a bonus if it matches ALL user's filtered genres (perfect fit)
    if (matchedGenres.length === genres.length && genres.length > 0) score += 10;
  }

  // 3. Director Match (20%)
  if (directors.includes(movie.director)) {
    score += 25;
  }

  // 4. Actor Match (20%)
  const matchedActors = movie.actors.filter(a => actors.includes(a));
  if (matchedActors.length > 0) {
    score += (matchedActors.length / Math.max(1, movie.actors.length)) * 25;
  }

  // 5. Theme Match (15%)
  const matchedThemes = movie.themes.filter(t => themes.includes(t));
  if (themes.length > 0) {
    score += (matchedThemes.length / themes.length) * 20;
  }

  // 6. Rating Bonus (Quality factor: 5%)
  // Scales rating (0-10) to a small bonus
  score += (movie.rating / 10) * 5;

  // Normalize to 100
  return Math.min(100, score);
};

export const generateRecommendationReasons = (
  movie: Movie,
  preferences: UserPreference
): RecommendationReason => {
  const reasons: string[] = [];
  const { genres, directors, actors, themes } = preferences;

  const matchedGenres = movie.genres.filter(g => genres.includes(g));
  if (matchedGenres.length > 0) {
    reasons.push(`${matchedGenres.join(' & ')} specialized film`);
  }

  if (directors.includes(movie.director)) {
    reasons.push(`Masterfully directed by ${movie.director}`);
  }

  const matchedActors = movie.actors.filter(a => actors.includes(a));
  if (matchedActors.length > 0) {
    reasons.push(`Stellar performance by ${matchedActors.join(', ')}`);
  }

  const matchedThemes = movie.themes.filter(t => themes.includes(t));
  if (matchedThemes.length > 0) {
    reasons.push(`Explores themes of ${matchedThemes.join(' & ')}`);
  }

  if (movie.rating >= 8.5) {
    reasons.push(`Critically acclaimed with a ${movie.rating}/10 rating`);
  }

  if (reasons.length === 0) {
    reasons.push('A hidden gem from Tamil cinema you might love');
  }

  const matchScore = calculateMatchScore(movie, preferences);

  return {
    movieId: movie.id,
    reasons: reasons.slice(0, 3), // Keep top 3 reasons
    matchScore
  };
};

export const getRecommendations = (
  movies: Movie[],
  preferences: UserPreference,
  limit: number = 6
): [Movie, RecommendationReason][] => {
  // Score and Filter all movies
  const scoredMovies = movies
    .map(movie => ({
      movie,
      matchScore: calculateMatchScore(movie, preferences)
    }))
    .filter(item => item.matchScore > 0) // Remove non-matches (strict year filter returns 0)
    .sort((a, b) => b.matchScore - a.matchScore); // Rank by relevance

  return scoredMovies.slice(0, limit).map(({ movie }) => {
    const reason = generateRecommendationReasons(movie, preferences);
    return [movie, reason];
  });
};