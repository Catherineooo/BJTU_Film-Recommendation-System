import React, { useState, useEffect, useRef } from "react";
import './RatingCard.css';

function RatingCard({ movie, toggleRatingCardVisible, handleUpdateFav }) {
    const [updateRating, setUpdateRating] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleRatingCardVisible = () => {
        toggleRatingCardVisible();
    }

    const handleContainerClick = (event) => {
        // Prevent propagation of click event to parent elements
        event.stopPropagation();
    }

    return (
        <>
            <div className="fav-bg" onClick={handleRatingCardVisible}>
                <div className="cardContainer" id='ratingCardContainer' onClick={handleContainerClick}>
                    <div className="card" id='ratingCard'>
                        <span className="targetUpdateMovie">{movie.movieName}</span>
                        <div className="fav-footer">
                            <form className='fav-form' onSubmit={handleUpdateFav(updateRating, movie.movieId)}>
                                <div className='fav-rating'>
                                    <input
                                        className='fav-input'
                                        type='number' name='favrating'
                                        step={0.1} max={10} min={0} placeholder='0.0'
                                        onChange={(e) => { setUpdateRating(e.target.value) }}
                                        ref={inputRef}
                                        required
                                    />
                                    <span>/10</span>
                                </div>
                                <button type='submit' className="trailer-btn" id="add-btn">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RatingCard;