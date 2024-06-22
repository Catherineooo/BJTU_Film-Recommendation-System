import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies, fetchTv, fetchRecommends } from '../../api';
import MovieCard from '../../components/MovieCard/MovieCard';
import Backdrop from '../../components/Backdrop/backdrop';
import { AiOutlineRight } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';
import './Home.css';
import axios from 'axios';

const Home = ({ user }) => {
  const [userRecommend, setUserRecommend] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [loadingRecommend, setLoadingRecommend] = useState(true);
  const break1275 = useMediaQuery({ maxWidth: 1275 });

  useEffect(() => {
    const getUserRecommend = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('token');
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recommend/getRecommend`, {
          params: { 
            userId: user.id,
            token: token
          }
        });
        const recommendedMovies = await fetchRecommends(response.data.data.movies, 5);
        setUserRecommend(recommendedMovies);
      } catch (err) {
        console.error('Error getting user recommend:', err);
      } finally {
        setLoadingRecommend(false);
      }
    };

    const fetchAllMovies = async () => {
      try {
        const popular = await fetchMovies('popular');
        const upcoming = await fetchMovies('upcoming');
        const tv = await fetchTv('popular');
        const topRatedTv = await fetchTv('top_rated');
        setPopularMovies(popular);
        setUpcomingMovies(upcoming);
        setTvShows(tv);
        setTopRatedTvShows(topRatedTv);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setPopularMovies([1, 2, 3]);
        setUpcomingMovies(['failed']);
        setTvShows([]);
        setTopRatedTvShows([]);
      }
    };

    getUserRecommend();
    fetchAllMovies();
  }, [user]);

  return (
    <div className="home-div">
      {popularMovies && (
        <Backdrop popularMovies={popularMovies} />
      )}
      {user && !loadingRecommend && userRecommend.length !== 0 && (
        <div className='movie-section'>
          <div className='section-header'>
            <h2>为您推荐</h2>
            <Link to={`/movies/${'recommend'}/${'movie'}`} className='more-link' >
              <button className='more-btn'>More <AiOutlineRight className='right-icon' /></button>
            </Link>
          </div>
          <div className="movie-container">
            <div className="movie-list">
              {userRecommend.slice(0, break1275 ? 4 : 5).map(movie => <MovieCard key={movie.id} movie={movie} id={'movie'} />)}
            </div>
          </div>
        </div>
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
