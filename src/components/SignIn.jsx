// src/components/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig';
import '../styles/SignIn.css'; // Using Auth.css instead of SignIn.css

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/signin/', {
        email: formData.email,
        password: formData.password
      });
      
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8000/api/auth/google/';
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Please enter your details</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            Sign in
          </button>
        </form>
        
        <button 
          className="google-btn"
          onClick={handleGoogleSignIn}
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