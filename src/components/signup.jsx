// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig';
import '../styles/signup.css'; 
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/signup/', {
        email: formData.email,
        password: formData.password
      });
      
      if (response.data) {
        navigate('/signin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:8000/api/auth/google/';
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Hello there</h2>
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
          
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">
            Sign up
          </button>
        </form>
        
        <div className="divider">OR</div>
        
        <button 
          className="google-btn"
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </button>
        
        <p className="auth-footer">
          already have an account?{' '}
          <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;