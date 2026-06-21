export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  actors: string[];
  genres: string[];
  description: string;
  imageUrl: string;
  rating: number;
  language: string;
  runtime: number;
  themes: string[];
}

export interface UserPreference {
  genres: string[];
  directors: string[];
  actors: string[];
  yearRange: [number, number];
  themes: string[];
}

export interface RecommendationReason {
  movieId: string;
  reasons: string[];
  matchScore: number;
}