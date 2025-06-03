import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css'; // This must be imported
export default function App() {
  const [splash, setSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null); // null = loading

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Check login **after** splash screen ends
  useEffect(() => {
    if (!splash) {
      fetch('http://localhost:5000/me', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setLoggedIn(!!data.email))
        .catch(() => setLoggedIn(false));
    }
  }, [splash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {splash ? (
          <SplashScreen key="splash" />
        ) : loggedIn === null ? null : loggedIn ? (
          <div key="home">
            <Navbar />
            <HomePage />
            <Footer />
          </div>
        ) : (
          <div key="login">
            <Navbar />
            <LoginPage />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
