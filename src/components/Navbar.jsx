import React from "react";
// import IITMlogo from "../assets/IITMlogo.svg";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <img src={IITMlogo} alt="IIT Madras Logo" className="h-12 w-12" /> */}

            <span className="text-lg font-semibold text-black">
              IIT Madras NetAccess
            </span>
          </div>
          <div className="flex items-center">
            {/* <a
              href="https://cc.iitm.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Computer Center
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
