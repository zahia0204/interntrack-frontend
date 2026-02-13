// src/components/HeroPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar'; // Import the Navbar component
import '../styles/HeroPage.css';

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-page">
      <Navbar /> {/* Use the Navbar component */}
      
      {/* Hero Content - Left Aligned */}
      <div className="hero-content-wrapper">
        <div className="hero-text-container">
          <h1 className="hero-title">InternTrack</h1>
          <p className="hero-description">
          Track your internship applications and progress all in one place. <br />
Never miss an application deadline again.
          </p>
          <button 
            className="get-started-btn"
            onClick={() => navigate('/signup')}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;