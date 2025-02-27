// Navbar.js
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full bg-white shadow-lg z-30 animate-slide-in-top">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img src="/logo.png" alt="SnapFix Logo" className="h-12" />
          <span className="text-2xl font-bold text-orange-600">SnapFix</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <div className="space-y-2">
            <span className={`block w-6 h-0.5 bg-orange-600 transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-orange-600 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-orange-600 transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>

        {/* Navigation Content */}
        <div className={`md:flex flex-1 items-center justify-between ${isOpen ? 'block absolute top-20 left-0 right-0 bg-white shadow-lg py-4 px-6' : 'hidden'}`}>
          {/* Navigation Links */}
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-8 ml-0 md:ml-8">
            <a href="/" className="block text-gray-700 font-semibold hover:text-orange-600 transition-colors">HOME</a>
            <a href="#about" className="block text-gray-700 font-semibold hover:text-orange-600 transition-colors">ABOUT</a>
            <a href="#services" className="block text-gray-700 font-semibold hover:text-orange-600 transition-colors">SERVICES</a>
            <a href="#contact" className="block text-gray-700 font-semibold hover:text-orange-600 transition-colors">CONTACT US</a>
          </div>

          {/* Right Section */}
          <div className="mt-6 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <input
                type="search"
                placeholder="Search services..."
                className="w-full px-4 py-2.5 border border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 placeholder-gray-400"
              />
              <button className="absolute right-3 top-2.5 text-orange-500 hover:text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <button className="px-6 py-2.5 text-orange-600 hover:bg-orange-50 rounded-full transition-colors font-semibold">
                Login
              </button>
              <button className="px-6 py-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-semibold shadow-md hover:shadow-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;