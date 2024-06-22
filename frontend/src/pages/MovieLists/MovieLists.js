import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchMovies, fetchTv, fetchRecommends } from "../../api";
import MovieCard from "../../components/MovieCard/MovieCard";
import './MovieLists.css';
import axios from "axios";

const MovieLists = ({ user }) => {
    const { type, id } = useParams();
    const [movies, setMovies] = useState([]);
    const [section, setSection] = useState('');

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                if (type === 'recommend') {
                    const token = localStorage.getItem('token');
                    let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recommend/getRecommend`, {
                        params: { 
                            userId: user.id,
                            token: token
                        }
                    });
                    const recommendedMovies = await fetchRecommends(response.data.data.movies, 20);
                    setMovies(recommendedMovies);
                    setSection('为您推荐');
                } else if (id === 'movie') {
                    setMovies(await fetchMovies(type));
                    if (type === 'popular') {
                        setSection('热门电影');
                    } else {
                        setSection('即将上映');
                    }
                } else {
                    setMovies(await fetchTv(type));
                    if (type === 'popular') {
                        setSection('热门电视剧');
                    } else {
                        setSection('高分电视剧');
                    }
                }
            } catch (e) {
                console.error('Error fetching movies:', e);
                setMovies([]);
            }
        }

        fetchAllMovies();
    }, [id, type, user]);

    return (
        <div className="home-div">
            <div className='movie-section' >
                <div className='section-header' id='section-header'>
                    <h2>{section}</h2>
                </div>
                <div className="movie-container">
                    <div className="movie-list">
                        {movies.map(movie => <MovieCard key={movie.id} movie={movie} id={id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieLists;