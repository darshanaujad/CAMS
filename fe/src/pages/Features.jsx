import React from "react";
import { GraduationCap, UserCheck, Settings } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900">
          Powerful Academic Management Features
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Comprehensive tools designed for every role in your institution
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Student Portal */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl mb-6">
            <GraduationCap size={28} />
          </div>

          <h3 className="text-xl font-semibold mb-3">
            Student Portal
          </h3>

          <p className="text-gray-600 mb-6">
            Access grades, attendance, assignments, and course materials
            in one centralized dashboard.
          </p>

          <ul className="space-y-2 text-gray-600">
            <li>✓ View Academic Records</li>
            <li>✓ Submit Assignments</li>
            <li>✓ Track Attendance</li>
            <li>✓ Course Resources</li>
          </ul>

        </div>

        {/* Teacher Dashboard */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="w-14 h-14 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl mb-6">
            <UserCheck size={28} />
          </div>

          <h3 className="text-xl font-semibold mb-3">
            Teacher Dashboard
          </h3>

          <p className="text-gray-600 mb-6">
            Manage classes, grade assignments, track student progress,
            and communicate efficiently.
          </p>

          <ul className="space-y-2 text-gray-600">
            <li>✓ Grade Management</li>
            <li>✓ Attendance Tracking</li>
            <li>✓ Assignment Creation</li>
            <li>✓ Student Analytics</li>
          </ul>

        </div>

        {/* Admin Control */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

          <div className="w-14 h-14 flex items-center justify-center bg-purple-100 text-purple-600 rounded-xl mb-6">
            <Settings size={28} />
          </div>

          <h3 className="text-xl font-semibold mb-3">
            Admin Control
          </h3>

          <p className="text-gray-600 mb-6">
            Complete system oversight with user management,
            reporting, and institutional analytics.
          </p>

          <ul className="space-y-2 text-gray-600">
            <li>✓ User Management</li>
            <li>✓ System Reports</li>
            <li>✓ Role Permissions</li>
            <li>✓ Data Analytics</li>
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Features;