import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineMore, AiFillStar } from "react-icons/ai";
import axios from "axios";
import './favourite.css';

function Favourite({ userDetail }) {
    const [favLists, setFavLists] = useState([]);

    const getFavourite = useCallback(async (email) => {
        try {
            const response = await axios.get(`${process.env.BACKEND_API_URL}/api/getFavourite`, {
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
    }, [userDetail, getFavourite]);

    if (!userDetail) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="favourite-div">
                <div className='section-header'>
                    <h2>All-Time Favourites</h2>
                </div>
                <div className="favourite-container">
                    <div className="favourite-list">
                        {favLists.length > 0 ? (
                            <table className="fav-list-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Movie</th>
                                        <th className="date-col">Release Date</th>
                                        <th className="rating-col">Rating</th>
                                        <th className="more-col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favLists.map((movie, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{movie.movieName}</td>
                                            <td className="date-cell">{new Date(movie.movieDate).getFullYear()}</td>
                                            <td className="rating-cell">
                                                <div>
                                                    <span>{movie.rating.toFixed(1)}</span><AiFillStar className='fav-star' />
                                                </div>
                                            </td>
                                            <td className="more-cell">
                                                <button className="fav-more-btn"><AiOutlineMore /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <span>No favourites found.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favourite;
