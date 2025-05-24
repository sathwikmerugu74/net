import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';

const LDAPLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLDAPLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/ldap-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.reload(); // Reload app to reflect authenticated state
      } else {
        setError(data.error || 'LDAP login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLDAPLogin} className="input-group" style={{ flexDirection: 'column' }}>
      <input
        type="text"
        placeholder="LDAP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
      >
        {loading ? 'Logging in...' : 'Login with LDAP'}
      </button>
      {error && <p className="error text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
};

const LoginPage = () => {
  const [method, setMethod] = useState('ldap'); // Options: ldap, otp, google

  return (
    <motion.div
      className="login-page flex flex-col items-center justify-center min-h-[80vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="login-logo-wrap mb-8"
        layoutId="logo"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <School className="h-16 w-16 text-black" />
      </motion.div>

      <motion.div
        className="login-card bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to NetAccess</h2>

        <div className="login-tabs flex gap-4 mb-6">
          <button 
            onClick={() => setMethod('ldap')} 
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === 'ldap' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            LDAP
          </button>
          <button 
            onClick={() => setMethod('otp')} 
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === 'otp' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            OTP
          </button>
          <button 
            onClick={() => setMethod('google')} 
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === 'google' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Google
          </button>
        </div>

        {method === 'ldap' && <LDAPLogin />}
        {method === 'otp' && <div className="text-center text-gray-500">OTP login coming soon</div>}
        {method === 'google' && <div className="text-center text-gray-500">Google login coming soon</div>}
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;