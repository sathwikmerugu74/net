import React from 'react';
import googleLogo from '../assets/google-icon.svg'; // Make sure this file exists

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/login'; // Redirect to your Flask OAuth flow
  };

  return (
    <button className="google-oauth-btn" onClick={handleGoogleLogin}>
      <img src={googleLogo} alt="Google" className="google-icon" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
