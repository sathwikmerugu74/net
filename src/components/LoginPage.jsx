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
        className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
      />
      <input
        type="password"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-2 bg-black text-white hover:bg-black/90 transition-colors"
      >
        Login with LDAP
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
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-300 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <School className="h-5 w-5" />
              <span>IIT Madras NetAccess</span>
            </div>
            <a 
              href="https://cc.iitm.ac.in"
              className="text-blue-600 underline text-sm"
            >
              Computing Center
            </a>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <School className="h-16 w-16 mb-8" />

          <div className="w-full max-w-md border border-gray-300">
            <h2 className="text-xl text-center py-4 border-b border-gray-300">Welcome to NetAccess</h2>

            <div className="grid grid-cols-3 border-b border-gray-300">
              <button 
                onClick={() => setMethod('ldap')} 
                className={`py-2 text-sm ${method === 'ldap' ? 'bg-black text-white' : ''}`}
              >
                LDAP
              </button>
              <button 
                onClick={() => setMethod('otp')} 
                className={`py-2 text-sm border-l border-r border-gray-300 ${method === 'otp' ? 'bg-black text-white' : ''}`}
              >
                OTP
              </button>
              <button 
                onClick={() => setMethod('google')} 
                className={`py-2 text-sm ${method === 'google' ? 'bg-black text-white' : ''}`}
              >
                Google
              </button>
            </div>

            <div className="p-4">
              {method === 'ldap' && <LDAPLogin />}
              {method === 'otp' && <div className="text-center text-gray-500">OTP login coming soon</div>}
              {method === 'google' && <div className="text-center text-gray-500">Google login coming soon</div>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 py-4">
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
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;