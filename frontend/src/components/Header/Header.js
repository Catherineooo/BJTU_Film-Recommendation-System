// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineUser, AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import './Header.css';

const Header = ({ userDetails, toggleProfileVisible, toggleLoginVisible }) => {
  const user = userDetails.user;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    setQuery('');
  };

  const handleProfile = async () => {
    toggleProfileVisible();
  };

  const handleLogin = () => {
    toggleLoginVisible();
  }

  const handleFav = () => {
    navigate('/favourite');
  }

  return (
    <header>
      <Link className='header-logo' to='/'>
        <img className='logo' src='./favicon.ico' alt='logo' />
        <h2 className='name'>PopWatch</h2>
      </Link>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="search-bar"
            required
          />
          <button type="submit" className="search-button"><AiOutlineSearch className='search-icon' /></button>
        </div>
      </form>
      <div className='utility'>
        <button className='utility-btn' onClick={handleFav} ><AiOutlineHeart className='utility-icon' /></button>
        <button className='utility-btn'><AiOutlineBell className='utility-icon' /></button>
        {user ? (
          <img
          className='profile-pic'
          src={user.picture || '/images/fox-avatar.png'}
          alt={user.name}
          title={user.name}
          onClick={handleProfile}
        />        ) : (
          <button className='utility-btn' onClick={handleLogin}><AiOutlineUser className='utility-icon' /></button>
        )}
      </div>
    </header>
  );
};

export default Header;
