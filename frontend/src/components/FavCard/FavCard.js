import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './FavCard.css';

function FavCard({ userDetail, movie, favCardVisible, toggleFavCardVisible }) {
    const user = userDetail;
    const [favrating, setFavrating] = useState('');
    const [errormsg, setErrormsg] = useState('');

    useEffect(() => {
        if (errormsg) {
            toast.info(errormsg, {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeButton: false
            });
            setErrormsg(''); // Clear the errormsg state after displaying the toast
        }
    }, [errormsg]);

    const handleFavCardVisible = () => {
        toggleFavCardVisible();
    }

    const handleContainerClick = (event) => {
        // Prevent propagation of click event to parent elements
        event.stopPropagation();
    }

    const handleFav = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.BACKEND_API_URL}/api/favourite`, {
                movie,
                user,
                favrating,
            });
            console.log(response.data.message);
            toast.success('Favourite added sucessfully', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeButton: false
            });
            handleFavCardVisible();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.message);
                setErrormsg(error.response.data.message);
            } else {
                console.log('An unexpected error occurred. Please try again.');
                setErrormsg(error.response.data.message);
            }
        }
    }

    return (
        <>
            <ToastContainer />
            {favCardVisible && (
                <div className="fav-bg" onClick={handleFavCardVisible}>
                    <div className="cardContainer" id='favCardContainer' onClick={handleContainerClick}>
                        <div className="card" id='favCard'>
                            {/*<img
                                className='fav-poster'
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                        : 'https://placehold.co/500x750.png'
                                }
                                alt={movie.title || movie.name}
                            />*/}
                            <div className="fav-footer">
                                <form className='fav-form' onSubmit={handleFav}>
                                    <div className='fav-rating'>
                                        <input
                                            className='fav-input'
                                            type='number' name='favrating'
                                            step={0.1} max={10} min={0} placeholder='0.0'
                                            onChange={(e) => { setFavrating(e.target.value) }}
                                            required
                                        />
                                        <span>/10</span>
                                    </div>
                                    <button type='submit' className="trailer-btn" id="add-btn">Add to Favourites</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavCard;