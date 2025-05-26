import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar loggedIn={isAuthenticated} setLoggedIn={setIsAuthenticated} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Redirect / to /home */}
              <Route
                path="/"
                element={<Navigate to="/home" replace />}
              />

              {/* Protected HomePage Route */}
              <Route
                path="/home"
                element={
                  isAuthenticated ? (
                    <HomePage onLogout={() => setIsAuthenticated(false)} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              {/* Login Page */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <div className="flex items-center justify-center min-h-full">
                      <LoginPage onLogin={() => setIsAuthenticated(true)} />
                    </div>
                  )
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
