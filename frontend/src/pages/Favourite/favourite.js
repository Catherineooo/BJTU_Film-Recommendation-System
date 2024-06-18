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
        const email = userDetail.email;

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updateFavourite`, {
                email,
                movieId,
                updateRating
            });

            if (response.status === 200) {
                toggleRatingCardVisible();
                // Call getFavourite to refresh the list from backend
                await getFavourite(email);
            }

            console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }

    const handleFavDelete = async (movieId, email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/deleteFavourite`, {
                movieId,
                email,
            })

            if (response.status === 200) {
                // Call getFavourite to refresh the list from backend
                await getFavourite(email);
            }

            console.log(response.data.message);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }

    const getFavourite = useCallback(async (email) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getFavourite`, {
                params: { userEmail: email }
            });
            console.log('Fetched data:', response.data.favLists);
            setFavLists(response.data.favLists);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error:', error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
            }
        }
    }, []);

    useEffect(() => {
        if (userDetail && userDetail.email) {
            console.log('useEffect triggered for user:', userDetail.email); // Debug log
            getFavourite(userDetail.email);
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [userDetail, getFavourite]);

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
                    <h2>All-Time Favourites</h2>
                </div>
                <div className="favourite-container">
                    <div className="favourite-list">
                        {sortedFavLists.length > 0 ? (
                            <table className="fav-list-table">
                                <thead>
                                    <tr>
                                        <th className="rank-col">#</th>
                                        <th>Movie</th>
                                        <th className="date-col">Release</th>
                                        <th className="rating-col">Rating</th>
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
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div clasName="dropdown-item">
                                                        <button className="delete-btn" onClick={() => handleFavDelete(movie.movieId, userDetail.email)}>
                                                            <AiOutlineDelete className="delete-icon" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty">No favourites found.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favourite;