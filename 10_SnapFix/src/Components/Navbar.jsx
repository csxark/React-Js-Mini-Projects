// Navbar.js
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-30 animate-slide-in-left">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="Service-Lo Logo" className="h-10" />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <div className="space-y-2">
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>

        {/* Navigation Content */}
        <div className={`md:flex flex-1 items-center justify-between ${isOpen ? 'block absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6' : 'hidden'}`}>
          {/* Navigation Links */}
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-6 ml-0 md:ml-4">
            <a href="/" className="block text-gray-700 font-semibold hover:text-blue-500 transition-colors">HOME</a>
            <a href="#about" className="block text-gray-700 font-semibold hover:text-blue-500 transition-colors">ABOUT</a>
            <a href="#services" className="block text-gray-700 font-semibold hover:text-blue-500 transition-colors">SERVICES</a>
            <a href="#contact" className="block text-gray-700 font-semibold hover:text-blue-500 transition-colors">CONTACT US</a>
          </div>

          {/* Right Section */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <input
                type="search"
                placeholder="Search services..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-500">
                <i className="fas fa-search"></i>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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