import React, { useState } from 'react';
import { School } from 'lucide-react';

const LDAPLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        className="input-field"
        placeholder="LDAP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="input-field"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="submit-button">
        Login with LDAP
      </button>
    </form>
  );
};

const LoginPage = () => {
  const [method, setMethod] = useState('ldap');

  return (
    <div>
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo-text">
            <School size={20} />
            <span>IIT Madras NetAccess</span>
          </div>
          <a 
            href="https://cc.iitm.ac.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="computing-center"
          >
            Computing Center
          </a>
        </div>
      </nav>

      <main className="main-content">
        <div style={{ marginBottom: '2rem' }}>
          <School size={48} />
        </div>

        <div className="login-card">
          <div className="card-header">
            <h2>Welcome to NetAccess</h2>
          </div>

          <div className="tabs">
            <button 
              className={`tab ${method === 'ldap' ? 'active' : ''}`}
              onClick={() => setMethod('ldap')}
            >
              LDAP
            </button>
            <button 
              className={`tab ${method === 'otp' ? 'active' : ''}`}
              onClick={() => setMethod('otp')}
            >
              OTP
            </button>
            <button 
              className={`tab ${method === 'google' ? 'active' : ''}`}
              onClick={() => setMethod('google')}
            >
              Google
            </button>
          </div>

          {method === 'ldap' && <LDAPLogin />}
          {method === 'otp' && <div className="login-form">OTP login coming soon</div>}
          {method === 'google' && <div className="login-form">Google login coming soon</div>}
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>© 2025 IIT Madras. All rights reserved.</div>
          <div className="footer-links">
            <a href="/terms" className="footer-link">Terms of Use</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;