
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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">

    <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* LEFT SECTION */}
      <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">
        
        <h1 className="text-4xl font-bold mb-6">
          Create a New Password
        </h1>

        <p className="text-blue-100 text-lg leading-relaxed mb-10">
          Your security is important to us. Please choose a strong password 
          to protect your EduFlow account and continue managing your 
          academic activities securely.
        </p>

        <div className="space-y-4 text-blue-100">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Minimum 8 characters recommended
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Use letters, numbers & symbols
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Keep your password private
          </div>
        </div>
      </div>


      {/* RIGHT SECTION */}
      <div className="p-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your new password below
          </p>
        </div>

        <div className="space-y-6">

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>


          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>


          {/* BUTTON */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </div>


        {/* LOGIN LINK */}
        <div className="text-center mt-8 text-sm text-gray-600">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Login here
          </span>
        </div>

      </div>
    </div>
  </div>
);
};
export default ResetPassword ;