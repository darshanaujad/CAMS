import React from 'react'
import {ArrowRight} from 'lucide-react'

const Annoucements = () => {
  return (
    <div>
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
    </div>
  )
}

export default Annoucements
