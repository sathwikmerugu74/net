import React from 'react';
import { School } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6" />
            <span className="font-medium">IIT Madras NetAccess</span>
          </div>
          <a 
            href="https://cc.iitm.ac.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors text-sm"
          >
            Computing Center
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;