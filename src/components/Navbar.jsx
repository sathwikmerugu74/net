import React from "react";
import IITMlogo from "../assets/IITMlogo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use flex with items-center and justify-between on one row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title aligned left */}
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src={IITMlogo}
              alt="IIT Madras Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"
            />
            <span className="text-lg sm:text-xl font-bold text-black whitespace-nowrap overflow-hidden text-ellipsis">
              IIT Madras NetAccess
            </span>
          </div>

          {/* Logout button aligned right */}
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition whitespace-nowrap"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
