import React from 'react';
import { School } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <School className="h-8 w-8 text-black mr-2" />
            <span className="text-lg font-semibold text-black">IIT Madras NetAccess</span>
          </div>
          <div className="flex items-center">
            <a 
              href="https://cc.iitm.ac.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Computing Center
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;