// src/services/authService.js
import axiosInstance from '../utils/AxiosConfig';

const authService = {

  // Sign In
 // src/services/authService.js - FIXED VERSION

// Sign In - FIXED
signIn: async (credentials) => {
  try {
    console.log('🔵 Login credentials received:', credentials);
    
    // IMPORTANT: Django's TokenObtainPairView expects 'username' field
    // We need to send username, not email
    const loginData = {
      username: credentials.username || credentials.email,  // Use username if provided, otherwise use email
      password: credentials.password
    };
    
    console.log('🔵 Sending to Django:', loginData);
    
    const response = await axiosInstance.post('/api/login/', loginData);
    
    console.log('✅ Login success:', response.data);
    
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Store user info
      const user = { 
        username: loginData.username,
        email: credentials.email 
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    console.log('🔴 Login error:', error.response?.data);
    throw error.response?.data || { message: 'Login failed' };
  }
},

// Sign Up - FIXED
signUp: async (userData) => {
  try {
    console.log('🔵 Signup data received:', userData);
    
    // Make sure we're sending ALL required fields
    const signupData = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    };
    
    // If your backend expects password2 for confirmation
    if (userData.confirmPassword) {
      signupData.password2 = userData.confirmPassword;
    }
    
    console.log('🔵 Sending to Django:', signupData);
    
    const response = await axiosInstance.post('/api/register/', signupData);
    
    console.log('✅ Signup success:', response.data);
    return response.data;
  } catch (error) {
    console.log('🔴 Signup error:', error.response?.data);
    throw error.response?.data || { message: 'Sign up failed' };
  }
},

  // Sign Out
  signOut: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Google OAuth - You'll need to implement this on your backend first
  googleAuth: () => {
    // You'll need to create this endpoint in Django
    window.location.href = 'http://localhost:8000/api/auth/google/';
  }
};

export default authService;