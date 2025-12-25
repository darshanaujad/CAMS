import React, { useState } from 'react';

export default function NavBar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
  };
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <svg 
                  className="w-7 h-7 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 14l9-5-9-5-9 5 9 5z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" 
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">EduFlow</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Features
              </a>
              <a href="#announcements" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Announcements
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Login
              </button>
              <button 
                onClick={handleRegister}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-blue-600 font-medium">
                Home
              </a>
              <a href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">
                Features
              </a>
              <a href="#announcements" className="block text-gray-700 hover:text-blue-600 font-medium">
                Announcements
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </a>
              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={handleLogin}
                  className="text-blue-600 font-semibold"
                >
                  Login
                </button>
                <button 
                  onClick={handleRegister}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}


