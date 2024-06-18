import React from 'react';
import './profile.css';

function Profile({ userDetails, profileVisible, toggleProfileVisible }) {
    const user = userDetails.user;

    const handleProfileVisible = () => {
        toggleProfileVisible();
    }

    const handleContainerClick = (event) => {
        // Prevent propagation of click event to parent elements
        event.stopPropagation();
    }

    const handleLogout = async () => {
        localStorage.removeItem('token');
        window.location = '/';
    };

    return (
        <>
            {profileVisible && (
                <div className="auth-bg" onClick={handleProfileVisible}>
                    <div className="cardContainer" onClick={handleContainerClick}>
                        <div className="card">
                            <p className="auth-title">PROFILE</p>
                            <div className='auth-profile'>
                                <img className='profile-img' src={user.picture || '/images/fox-avatar.png'} alt={user.name} />
                                <div className='profile-detail'>
                                    <span>{user.username}</span>
                                </div>
                            </div>
                            <div className="profile-separator">
                                <div></div>
                            </div>
                            <button className="login-btn" id="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;