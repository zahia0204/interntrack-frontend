// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HeroPage from './components/HeroPage';
import SignIn from './components/SignIn';
import SignUp from './components/signup';
import Navbar from './components/navbar';

// Create a wrapper component to conditionally show navbar
function AppContent() {
  const location = useLocation();
  
  // Hide navbar on signin and signup pages
  const hideNavbar = location.pathname === '/signin' || location.pathname === '/signup';
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;