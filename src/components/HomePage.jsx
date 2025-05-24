import React, { useState } from 'react';
import { School } from 'lucide-react';

const HomePage = () => {
  const [deviceType, setDeviceType] = useState('non-router');
  const [expiryOption, setExpiryOption] = useState('1h');
  const [isShared, setIsShared] = useState(false);

  const handleApprove = (e) => {
    e.preventDefault();
    // Handle approval logic
  };

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
            <h2>Device Registration</h2>
          </div>

          <form className="login-form" onSubmit={handleApprove}>
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>IP Address:</strong> 192.168.1.1</p>
              <p><strong>MAC Address:</strong> 00:11:22:33:44:55</p>
            </div>

            <select 
              className="input-field"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option value="non-router">Non-Router Device</option>
              <option value="router">Router</option>
            </select>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={isShared}
                  onChange={(e) => setIsShared(e.target.checked)}
                /> 
                Shared / Public Device
              </label>
            </div>

            <select
              className="input-field"
              value={expiryOption}
              onChange={(e) => setExpiryOption(e.target.value)}
              disabled={isShared}
            >
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
              {!isShared && <option value="1m">1 Month</option>}
              {!isShared && <option value="custom">Custom</option>}
            </select>

            <button type="submit" className="submit-button">
              Approve Internet Access
            </button>
          </form>
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

export default HomePage;