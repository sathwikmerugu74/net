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
        window.location.reload();
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
    <form onSubmit={handleLDAPLogin} className="space-y-4">
      <input
        type="text"
        placeholder="LDAP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
      />
      <input
        type="password"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
      >
        {loading ? 'Logging in...' : 'Login with LDAP'}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

const LoginPage = () => {
  const [method, setMethod] = useState('ldap');

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <School className="h-6 w-6" />
              <span className="font-medium">IIT Madras NetAccess</span>
            </div>
            <a 
              href="https://cc.iitm.ac.in"
              className="text-gray-600 hover:text-black transition-colors text-sm"
            >
              Computing Center
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          className="mb-8"
          layoutId="logo"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <School className="h-16 w-16" />
        </motion.div>

        <motion.div
          className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome to NetAccess</h2>

          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button 
              onClick={() => setMethod('ldap')} 
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                method === 'ldap' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              LDAP
            </button>
            <button 
              onClick={() => setMethod('otp')} 
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                method === 'otp' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              OTP
            </button>
            <button 
              onClick={() => setMethod('google')} 
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
                method === 'google' 
                  ? 'bg-black text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Google
            </button>
          </div>

          {method === 'ldap' && <LDAPLogin />}
          {method === 'otp' && <div className="text-center text-gray-500">OTP login coming soon</div>}
          {method === 'google' && <div className="text-center text-gray-500">Google login coming soon</div>}
        </motion.div>
      </div>

      <footer className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-2 md:mb-0">
              © 2025 IIT Madras. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://www.iitm.ac.in/terms" className="text-sm text-gray-500 hover:text-black">
                Terms of Use
              </a>
              <a href="https://www.iitm.ac.in/privacy" className="text-sm text-gray-500 hover:text-black">
                Privacy Policy
              </a>
              <a href="https://www.iitm.ac.in/contact" className="text-sm text-gray-500 hover:text-black">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default LoginPage;