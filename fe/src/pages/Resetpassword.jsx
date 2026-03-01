
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
// import useDeviceDetection from "../hooks/useDeviceDetection";
// import { FaArrowLeftLong } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_ENDPOINT;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
//   const { theme } = useTheme();
//   const deviceInfo = useDeviceDetection();

  const token = searchParams.get("token");
  const auth = searchParams.get("auth");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!token) {
      return toast.error("Invalid or missing reset token");
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/${auth}/reset-password`, {
        token,
        newPassword: password
      });

      navigate("/login", { replace: true });

    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    
    <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
      
      {/* LEFT SIDE CONTENT */}
      <div className="hidden md:block">
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mr-3">
            Secure
          </span>
          <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
            Reliable
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Reset Your Account Password
        </h1>

        <p className="text-gray-600 text-lg">
          Set a new secure password to continue accessing your 
          EduFlow College Academic Management System.
        </p>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Reset Password
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your new password below
        </p>

        <div className="space-y-5">

          {/* New Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter new password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full ${
              !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300"
            } text-white font-semibold py-3 rounded-lg transition duration-200`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResetPassword ;