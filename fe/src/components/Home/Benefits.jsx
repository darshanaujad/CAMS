import React from 'react'
import {Lock, Bot, Zap, TrendingUp} from 'lucide-react'

const Benefits = () => {
  return (
    <div>
 {/* Why CAMS Section */}
      <section className='bg-gradient-to-br from-gray-50 to-blue-50 py-20'>
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
    </div>
  )
}

export default Benefits
