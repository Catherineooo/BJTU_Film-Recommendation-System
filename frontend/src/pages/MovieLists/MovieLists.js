import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchMovies, fetchTv } from "../../api";
import MovieCard from "../../components/MovieCard/MovieCard";
import './MovieLists.css';

const MovieLists = () => {
    const { type, id } = useParams();
    const [movies, setMovies] = useState([]);
    const [section, setSection] = useState('');

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                if (id === 'movie') {
                    setMovies(await fetchMovies(type));
                    if (type === 'popular') {
                        setSection('Popular Movies');
                    } else {
                        setSection('Upcoming Movies');
                    }
                } else {
                    setMovies(await fetchTv(type));
                    if (type === 'popular') {
                        setSection('Popular Tv Shows');
                    } else {
                        setSection('Top Rated Tv Shows');
                    }
                }
            } catch {
                setMovies([]);
            }
        }

        fetchAllMovies();
    }, [id, type]);

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