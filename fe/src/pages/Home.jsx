import React, { useState } from 'react';
import { Shield, CheckCircle, Users, GraduationCap, UserCheck, Settings, Check, Lock, Bot, Zap, TrendingUp, ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handleGetStarted = () => {
    setShowRegisterModal(true);
  };

  const handleLearnMore = () => {
    window.location.href = '#features';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
              <span className="text-2xl font-bold text-gray-900">CAMS</span>
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

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Reliable</span>
              </div>
              <div className="flex items-center space-x-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Role-Based Platform</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              College Academic Management System
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              A comprehensive, enterprise-grade platform designed to streamline academic operations, 
              enhance collaboration, and provide real-time insights for students, teachers, and administrators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                Get Started
              </button>
              <button 
                onClick={handleLearnMore}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-md border border-blue-200"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop" 
                alt="Academic Management" 
                className="w-full h-auto"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Academic Management Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for every role in your institution
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Portal Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Student Portal
              </h3>
              
              <p className="text-gray-600 mb-6">
                Access grades, attendance, assignments, and course materials in one centralized dashboard.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">View Academic Records</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Submit Assignments</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Track Attendance</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Course Resources</span>
                </li>
              </ul>
            </div>

            {/* Teacher Dashboard Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-indigo-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Teacher Dashboard
              </h3>
              
              <p className="text-gray-600 mb-6">
                Manage classes, grade assignments, track student progress, and communicate efficiently.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Grade Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Attendance Tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Assignment Creation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Student Analytics</span>
                </li>
              </ul>
            </div>

            {/* Admin Control Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Admin Control
              </h3>
              
              <p className="text-gray-600 mb-6">
                Complete system oversight with user management, reporting, and institutional analytics.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">User Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">System Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Role Permissions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Data Analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Why CAMS Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why CAMS is Better Than Traditional Management?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your institution with modern, efficient academic management
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Enterprise Security */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enterprise Security
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Bank-level encryption, role-based access control, and secure data storage protect sensitive academic information.
              </p>
            </div>

            {/* Eliminates Manual Work */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Eliminates Manual Work
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Automated grading, attendance tracking, and report generation save hundreds of administrative hours.
              </p>
            </div>

            {/* Lightning Fast */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Lightning Fast
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Instant access to records, real-time updates, and cloud-based infrastructure ensure zero downtime.
              </p>
            </div>

            {/* Real-Time Tracking */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Real-Time Tracking
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Monitor academic progress, attendance patterns, and performance metrics with live dashboards and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stay Updated, Stay Ahead
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Latest announcements and updates from the academic community
            </p>
          </div>

          {/* Announcements Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Academic Announcement */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  ACADEMIC
                </span>
                <span className="text-gray-500 text-sm">2 days ago</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mid-Semester Examinations Schedule Released
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                The examination schedule for all departments has been published. Students can view their timetables in the portal.
              </p>
              
              <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition group">
                Read More 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* System Announcement */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold">
                  SYSTEM
                </span>
                <span className="text-gray-500 text-sm">5 days ago</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                New Features Added to Student Portal
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enhanced assignment submission, improved grade tracking, and mobile app updates are now live.
              </p>
              
              <button className="flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition group">
                Read More 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Event Announcement */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                  EVENT
                </span>
                <span className="text-gray-500 text-sm">1 week ago</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Annual Tech Symposium Registration Open
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Register now for the annual technology symposium featuring industry experts and hands-on workshops.
              </p>
              
              <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition group">
                Read More 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              View All Announcements
            </button>
          </div>
        </div>
      </section>

      
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
    
  );
}