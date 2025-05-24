import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
