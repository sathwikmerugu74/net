import React, { useState } from 'react';

const LDAPLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="LDAP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login with LDAP</button>
    </form>
  );
};

const LoginPage = () => {
  const [method, setMethod] = useState('ldap');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <div>IIT Madras NetAccess</div>
          <a href="https://cc.iitm.ac.in" style={{ color: 'blue', textDecoration: 'underline' }}>Computing Center</a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem' }}>
          <svg width="64" height="64" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 3L1 9l11 6l9-4.91V17h2V9L12 3z"/>
          </svg>
        </div>

        {/* Login Card */}
        <div style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc' }}>
          <h2 style={{ textAlign: 'center', padding: '1rem', margin: 0, borderBottom: '1px solid #ccc' }}>
            Welcome to NetAccess
          </h2>

          {/* Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #ccc' }}>
            <button 
              onClick={() => setMethod('ldap')}
              style={{ 
                background: method === 'ldap' ? 'black' : 'white',
                color: method === 'ldap' ? 'white' : 'black',
                border: 'none',
                borderRight: '1px solid #ccc',
                padding: '0.5rem'
              }}
            >
              LDAP
            </button>
            <button 
              onClick={() => setMethod('otp')}
              style={{ 
                background: method === 'otp' ? 'black' : 'white',
                color: method === 'otp' ? 'white' : 'black',
                border: 'none',
                borderRight: '1px solid #ccc',
                padding: '0.5rem'
              }}
            >
              OTP
            </button>
            <button 
              onClick={() => setMethod('google')}
              style={{ 
                background: method === 'google' ? 'black' : 'white',
                color: method === 'google' ? 'white' : 'black',
                border: 'none',
                padding: '0.5rem'
              }}
            >
              Google
            </button>
          </div>

          {/* Login Form */}
          <div style={{ padding: '1rem' }}>
            {method === 'ldap' && <LDAPLogin />}
            {method === 'otp' && <div style={{ textAlign: 'center' }}>OTP login coming soon</div>}
            {method === 'google' && <div style={{ textAlign: 'center' }}>Google login coming soon</div>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #ccc', padding: '1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <div>© 2025 IIT Madras. All rights reserved.</div>
          <div>
            <a href="/terms" style={{ marginRight: '1rem' }}>Terms of Use</a>
            <a href="/privacy" style={{ marginRight: '1rem' }}>Privacy Policy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;