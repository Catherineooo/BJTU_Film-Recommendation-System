import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMore, AiFillStar, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import RatingCard from "../../components/RatingCard/RatingCard";
import axios from "axios";
import './favourite.css';

function Favourite({ userDetail }) {
    const [favLists, setFavLists] = useState([]);
    const [visibleDropdown, setVisibleDropdown] = useState(null);
    const [ratingCardVisible, setRatingCardVisible] = useState(false);
    const [targetMovie, setTargetMovie] = useState('');

    const handleDropdownClick = (index) => {
        setVisibleDropdown(visibleDropdown === index ? null : index);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.more-cell')) {
            setVisibleDropdown(null);
        }
    };

    const toggleRatingCardVisible = (movie) => {
        setTargetMovie(movie);
        setRatingCardVisible(!ratingCardVisible);
    }

    const handleUpdateFav = (updateRating, movieId) => async (e) => {
        e.preventDefault();
        try {
            console.log('movieId:', movieId, 'updateRating:', updateRating);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updateRating`, {
                username: userDetail.username,
                imdb_id: movieId,
                rating: updateRating
            });

            if (response.status === 200) {
                toggleRatingCardVisible();
                // Call getFavourite to refresh the list from backend
                await getRating(userDetail);
            }

            console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }

    const handleFavDelete = async (movieId, user) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/deleteFavourite`, { 
                username: user.username,
                imdb_id: movieId,
            })

            if (response.status === 200) {
                // Call getFavourite to refresh the list from backend
                await getRating(user);
            }

            console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }

    const getRating = useCallback(async (user) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getRating`, {
                params: { username: user.username }
            });
            console.log('Fetched data:', response.data);
            setFavLists(response.data.data.ratingList);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }, []);

    useEffect(() => {
        if (userDetail && userDetail.username) {
            console.log('useEffect triggered for user:', userDetail.username); // Debug log
            getRating(userDetail);
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [userDetail, getRating]);

    if (!userDetail) {
        return <div>Loading...</div>;
    }

    // Sort the favLists array based on rating from high to low
    const sortedFavLists = [...favLists].sort((a, b) => b.rating - a.rating);

    return (
        <>
            {ratingCardVisible && (
                <RatingCard movie={targetMovie} toggleRatingCardVisible={toggleRatingCardVisible} handleUpdateFav={handleUpdateFav} />
            )}
            <div className="favourite-div">
                <div className='section-header'>
                    <h2>所有评分</h2>
                </div>
                <div className="favourite-container">
                    <div className="favourite-list">
                        {sortedFavLists.length > 0 ? (
                            <table className="fav-list-table">
                                <thead>
                                    <tr>
                                        <th className="rank-col">#</th>
                                        <th>电影名称</th>
                                        <th className="date-col">上映年份</th>
                                        <th className="rating-col">评分</th>
                                        <th className="more-col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedFavLists.map((movie, index) => (
                                        <tr key={index}>
                                            <td className="rank-cell">{index + 1}</td>
                                            <td><Link className="fav-movie-link" to={`/movie/${movie.movieId}/${movie.type}`} >{movie.movieName}</Link></td>
                                            <td className="date-cell"><span>{new Date(movie.movieDate).getFullYear()}</span></td>
                                            <td className="rating-cell">
                                                <div>
                                                    <span>{movie.rating ? movie.rating.toFixed(1) : ''}</span>
                                                    <AiFillStar className='fav-star' />
                                                </div>
                                            </td>
                                            <td className="more-cell">
                                                <button className="fav-more-btn" onClick={() => handleDropdownClick(index)} ><AiOutlineMore /></button>
                                            </td>
                                            {visibleDropdown === index && (
                                                <div className="dropdown-menu">
                                                    <div clasName="dropdown-item">
                                                        <button className="edit-btn" onClick={() => toggleRatingCardVisible(movie)}>
                                                            <AiOutlineEdit className="edit-icon" />
                                                            编辑评分
                                                        </button>
                                                    </div>
                                                    <div clasName="dropdown-item">
                                                        <button className="delete-btn" onClick={() => handleFavDelete(movie.imdb_id, userDetail)}>
                                                            <AiOutlineDelete className="delete-icon" />
                                                            删除评分
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty">还没有评分哦</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favourite;