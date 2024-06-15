import React, { useState } from "react";
import "./ReviewCard.css";

const ReviewCard = (props) => {
    const { author_details, content, created_at } = props;
    const avatarPath = author_details?.avatar_path
        ? `https://image.tmdb.org/t/p/w500/${author_details.avatar_path}`
        : "/images/fox-avatar.png";
    const [showFullContent, setShowFullContent] = useState(false);
    const formattedDate = new Date(created_at).toLocaleDateString();
    const maxLength = 350; // Set the maximum length of the content to display initially

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const truncatedContent = content.slice(0, maxLength);
    const remainingContent = content.slice(maxLength);

    return (
        <div className="review-card">
            <div className="review-left">
                <img src={avatarPath} alt="Author Avatar" className="author-avatar" />
            </div>
            <div className="review-right">
                <div className="author-details">
                    <div className="author-username">
                        <span className="author-name">@{author_details.username || "Anonymous"}</span>
                        <span className="review-date">{formattedDate}</span>
                    </div>
                    <div className='rating' id='review-rating'>
                        <span className="rating-score">{author_details.rating !== null ? author_details.rating.toFixed(1) : ''}</span>
                        <span className="rating-score-total">/10</span>
                    </div>
                </div>
                <p className="review-content">
                    {truncatedContent}
                    {remainingContent && (
                        <>
                            {!showFullContent && "..."}
                            {showFullContent && remainingContent}
                        </>
                    )}
                </p>
                {remainingContent && (
                    <button className="read-more-btn" onClick={toggleContent}>
                        {showFullContent ? "Show less" : "Read more"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;