import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-lg text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
          ⚠️ Page Not Found
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-gray-900 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Oops! This page doesn’t exist
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you’re looking for might have been moved, deleted,
          or never existed. Let’s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;