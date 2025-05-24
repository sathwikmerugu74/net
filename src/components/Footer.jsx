import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} IIT Madras. All rights reserved.
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
  );
};

export default Footer;