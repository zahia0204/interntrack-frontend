// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render navbar on signin/signup pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="glassy-nav">
      <div className="nav-container">
        <div className="logo">InternTrack</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button 
            className="login-btn"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
          <button 
            className="signup-btn"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;