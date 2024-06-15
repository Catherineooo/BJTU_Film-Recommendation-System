import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import './SearchResults.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setResults(await searchMovies(query));
      } catch {
        setResults([1, 2, 3]);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className='search-result'>
      <div className='movie-section' >
        <div className='section-header'>
          <h2>Search Results : </h2>
          <span className='search-keyword'>{query}</span>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {results.map(movie => <MovieCard key={movie.id} movie={movie} id={movie.title ? 'movie' : 'tv'} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
