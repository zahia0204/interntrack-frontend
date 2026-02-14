// src/components/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',  // Add username field
    email: '',     // Keep email for reference
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use either username or email (whichever is provided)
      const loginCredentials = {
        username: formData.username || formData.email,  // Prefer username, fallback to email
        password: formData.password
      };
      
      await authService.signIn(loginCredentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err.username ? err.username[0] : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Please enter your details</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Username field (required by Django) */}
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          {/* Optional: Email field for reference */}
          
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
                <div className="divider">OR</div>
        <button 
          className="google-btn"
          onClick={() => {}}
          disabled={loading}
        >
          Sign in with Google
        </button>
        
        <p className="auth-footer">
          don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;