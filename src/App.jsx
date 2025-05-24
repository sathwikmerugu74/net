import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import './index.css';

export default function App() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {splash ? (
          <SplashScreen key="splash" />
        ) : (
          <HomePage key="home" />
        )}
      </AnimatePresence>
    </>
  );
}