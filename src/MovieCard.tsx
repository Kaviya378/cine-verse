import { Movie } from './types';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      margin: '10px',
      width: '200px'
    }}>
      <h3>{movie.title}</h3>
      <p>Genres: {movie.genres.join(', ')}</p>
      <p>Rating: {movie.rating}/10</p>
      <p>Director: {movie.director}</p>
      <p>Year: {movie.year}</p>
    </div>
  );
}

export default MovieCard;
