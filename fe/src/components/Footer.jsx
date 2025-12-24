import React from 'react'
import {Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <div>
            
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
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
                <span className="text-2xl font-bold text-white">CAMS</span>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                College Academic Management System is an enterprise-grade platform designed to streamline academic operations and enhance institutional efficiency.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a 
                  href="#facebook" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#twitter" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#linkedin" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#instagram" 
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#documentation" className="text-gray-400 hover:text-white transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Support */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Support</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <a href="mailto:support@cams.edu" className="text-gray-400 hover:text-white transition">
                    support@cams.edu
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">
                    123 Education Ave, Campus City
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 College Academic Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
