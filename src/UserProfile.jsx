import React, { useEffect, useState } from "react";
import api from "./api";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    api.get("/logout").then(() => {
      setUser(null);
      window.location.reload();
    });
  };

  if (!user) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user.name}</h2>
      <img src={user.picture} alt="profile" style={{ borderRadius: "50%" }} />
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserProfile;
