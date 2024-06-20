import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies, fetchTv } from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import Backdrop from '../../components/Backdrop/backdrop';
import { AiOutlineRight } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const break1275 = useMediaQuery({ maxWidth: 1275 });

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setPopularMovies(await fetchMovies('popular'));
        setUpcomingMovies(await fetchMovies('upcoming'));
        setTvShows(await fetchTv('popular'));
        setTopRatedTvShows(await fetchTv('top_rated'));
      } catch {
        setPopularMovies([1, 2, 3]);
        setUpcomingMovies(['failed']);
        setTvShows([]);
        setTopRatedTvShows([]);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className="home-div">
      {popularMovies && (
        <Backdrop popularMovies={popularMovies} />
      )}
      <div className='movie-section' >
        <div className='section-header'>
          <h2>热门电影</h2>
          <Link to={`/movies/${'popular'}/${'movie'}`} className='more-link' >
            <button className='more-btn'>More <AiOutlineRight className='right-icon' /></button>
          </Link>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {popularMovies.slice(0, break1275 ? 4 : 5).map(movie => <MovieCard key={movie.id} movie={movie} id={'movie'} />)}
          </div>
        </div>
      </div>
      <div className='movie-section' >
        <div className='section-header'>
          <h2>热门电视剧</h2>
          <Link to={`/movies/${'popular'}/${'tv'}`} className='more-link' >
            <button className='more-btn'>More <AiOutlineRight className='right-icon' /></button>
          </Link>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {tvShows.slice(0, break1275 ? 4 : 5).map(tv => <MovieCard key={tv.id} movie={tv} id={'tv'} />)}
          </div>
        </div>
      </div>
      <div className='movie-section' >
        <div className='section-header'>
          <h2>高分电视剧</h2>
          <Link to={`/movies/${'top_rated'}/${'tv'}`} className='more-link' >
            <button className='more-btn'>More <AiOutlineRight className='right-icon' /></button>
          </Link>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {topRatedTvShows.slice(0, break1275 ? 4 : 5).map(tv => <MovieCard key={tv.id} movie={tv} id={'tv'} />)}
          </div>
        </div>
      </div>
      <div className='movie-section' >
        <div className='section-header'>
          <h2>即将到来</h2>
          <Link to={`/movies/${'upcoming'}/${'movie'}`} className='more-link' >
            <button className='more-btn'>More <AiOutlineRight className='right-icon' /></button>
          </Link>
        </div>
        <div className="movie-container">
          <div className="movie-list">
            {upcomingMovies.slice(0, break1275 ? 4 : 5).map(movie => <MovieCard key={movie.id} movie={movie} id={'movie'} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
