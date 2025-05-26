import React, { useState } from "react";
import { motion } from "framer-motion";
import IITMLogo from '/src/assets/IITMlogo.svg';

const LDAPLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLDAPLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          onLogin();
        } else {
          setError("Invalid credentials.");
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLDAPLogin} className="input-group flex flex-col">
      <input
        type="text"
        placeholder="LDAP Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-black"
      />
      <input
        type="password"
        placeholder="LDAP Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        {loading ? "Logging in..." : "Login with LDAP"}
      </button>
      {error && <p className="error text-red-500 mt-2 text-sm">{error}</p>}

      {/* Forgot Password Section */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowForgotPassword(!showForgotPassword)}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Forgot Password?
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showForgotPassword ? "auto" : 0,
            opacity: showForgotPassword ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {showForgotPassword && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md border">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">
                Reset LDAP Password:
              </h4>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>
                  Go to{" "}
                  <a
                    href="https://ldap.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    https://ldap.example.com
                  </a>
                </li>
              </ol>
            </div>
          )}
        </motion.div>
      </div>
    </form>
  );
};

const LoginPage = ({ onLogin }) => {
  const [method, setMethod] = useState("ldap");

  // Define sizes per login method (only width fixed; height auto)
  const containerWidth = 800;

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
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center">
  <img 
    src={IITMLogo} 
    alt="IIT Madras Logo"
    className="h-10 w-10 object-contain" // Adjust size as needed
  />
</div>
      </motion.div>

      <motion.div
        className="login-card bg-white p-10 rounded-2xl shadow-lg overflow-hidden"
        style={{ width: `${containerWidth}px` }}
        layout // this enables smooth automatic layout animation
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Welcome to NetAccess
        </h2>

        <div className="login-tabs flex gap-4 mb-6">
          <button
            onClick={() => setMethod("ldap")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === "ldap"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            LDAP
          </button>
          <button
            onClick={() => setMethod("otp")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === "otp"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            OTP
          </button>
          <button
            onClick={() => setMethod("google")}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              method === "google"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Google
          </button>
        </div>

        {method === "ldap" && <LDAPLogin onLogin={onLogin} />}
        {method === "otp" && (
          <div className="text-center text-gray-500">OTP login coming soon</div>
        )}
        {method === "google" && (
          <div className="text-center text-gray-500">
            Google login coming soon
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
