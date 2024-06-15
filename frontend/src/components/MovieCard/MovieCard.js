import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import './MovieCard.css';

const MovieCard = ({ movie, id }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}/${id}`} className='movie-link'>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://placehold.co/500x750.png'
          }
          alt={movie.title || movie.name}
        />
        <h3 className='movie-title' title={movie.title || movie.name}>
          {movie.title ? movie.title : movie.name}
        </h3>
        <div className='movie-subtitle'>
          <span>{movie.release_date !== undefined ? movie.release_date.split('-')[0] : movie.first_air_date !== undefined ? movie.first_air_date.split('-')[0] : 'N/A'}</span>
          <div className='rating'>
          <span>{movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '0.0'}</span>            
          <AiFillStar className='star-icon' />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;