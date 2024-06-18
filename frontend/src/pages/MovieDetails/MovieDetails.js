import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, similarMovies, fetchTvDetails, fetchMovies, fetchTv, fetchReviews, fetchVideos } from '../../api';
import SideMovieCard from '../../components/SideMovieCard/SideMovieCard'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import FavCard from '../../components/FavCard/FavCard';
import Loader from '../../components/Loader/Loader';
import { AiOutlineHeart, AiOutlinePlayCircle, AiOutlineComment } from "react-icons/ai";
import './MovieDetails.css';

const MovieDetails = ({ user, toggleLoginVisible }) => {
  const { obj, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [genre, setGenre] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [video, setVideo] = useState(null);
  const [watch, setWatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favCardVisible, setFavCardVisible] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videos = await fetchVideos(id, obj);
        const trailer = videos.find(video => (video.type === "Trailer" || video.type === "Opening Credits") && video.site === "YouTube");
        setVideo(trailer ? trailer.key : null);
      } catch {
        setVideo(null);
      }
    };

    const fetchDetails = async () => {
      try {
        if (id === 'movie') {
          const [movieDetails, recommendedMovies] = await Promise.all([
            fetchMovieDetails(obj),
            similarMovies('movie', obj),
          ]);
          setMovie(movieDetails);
          setRecommend(recommendedMovies.length !== 0 ? recommendedMovies : await fetchMovies('popular'));
          setGenre(movieDetails.genres ? movieDetails.genres.map(genre => genre.name) : []);
        } else {
          const [tvDetails, recommendedTv] = await Promise.all([
            fetchTvDetails(obj),
            similarMovies('tv', obj),
          ]);
          setMovie(tvDetails);
          setRecommend(recommendedTv.length !== 0 ? recommendedTv : await fetchTv('popular'));
          setGenre(tvDetails.genres ? tvDetails.genres.map(genre => genre.name) : []);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (movieError) {
        console.error('Error fetching TV details or recommendations:', movieError);
        setMovie(null);
        setRecommend([]);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        setReviews(await fetchReviews(obj, id));
      } catch {
        setReviews([]);
      }
    };

    const resetVideo = async () => {
      setWatch(false);
    }

    fetchVideo();
    fetchDetails();
    fetchMovieReviews();
    resetVideo(false);
  }, [obj, id]);

  const handleWatch = () => {
    setWatch(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const toggleFavCardVisible = () => {
    if (user) {
      setFavCardVisible(!favCardVisible);
    } else {
      toggleLoginVisible();
    }
  }

  if (!movie) return <Loader />;

  return (
    <>
      <FavCard id={id} userDetail={user} movie={movie} favCardVisible={favCardVisible} toggleFavCardVisible={toggleFavCardVisible} />
      <div className="detail-wrapper">
        <div className='detail-left'>
          {watch && (
            <div className='detail-video'>
              {loading &&
                <Loader />
              }
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video}`}
                allowFullScreen={true}
                title={movie.title || movie.name}
                className='video-iframe'
                onLoad={() => setLoading(false)} // Set loading to false when iframe loads
              ></iframe>
            </div>
          )}
          <div className='detail-left-top'>
            <div className='poster-container'>
              <img
                className="detail-poster"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://placehold.co/500x750.png'
                }
                alt={movie.title || movie.name}
              />
              <button className="fav-btn" onClick={toggleFavCardVisible} ><AiOutlineHeart className='heart-icon' /></button>
            </div>
            <div className="detail-container">
              <h1>{movie.title ? movie.title : movie.name}</h1>
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-date">Release Date: {movie.release_date ? movie.release_date : movie.first_air_date}</p>
              <div className="movie-rating">
                <span>Rating: </span>
                <span className="movie-detail-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
              <div className='genres'>
                {genre.slice(0, 3).map((genreName, index) => (
                  <span key={index} className='genre-item'>{genreName}</span>
                ))}
              </div>
              {video &&
                <button className='trailer-btn' onClick={handleWatch}>
                  <AiOutlinePlayCircle className='play-icon' />
                  Trailer
                </button>
              }
            </div>
          </div>
          <div className='detail-review'>
            <div className="review-section">
              <h2>Reviews</h2>
              <div className="review-list">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                  ))
                ) : (
                  <div className='no-reviews'>
                    <AiOutlineComment className='comment-icon' />
                    No reviews
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="detail-right">
          <h2>You May Also Like</h2>
          {recommend.map(movie => (
            <SideMovieCard key={movie.id} movie={movie} id={id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
