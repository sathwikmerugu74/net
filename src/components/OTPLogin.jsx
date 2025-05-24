import React, { useState } from 'react';
import api from '../api';

const OTPLogin = () => {
  const [email, setEmail] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post('/send-otp', { email });
      alert('OTP sent!');
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  return (
    <form onSubmit={handleSendOtp} className="input-group" style={{ flexDirection: 'column' }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default OTPLogin;
