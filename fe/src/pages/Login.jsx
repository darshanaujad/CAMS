import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Icon Components ─────────────────────────────────────────── */

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path fill="#00A4EF" d="M0 0h11.5v11.5H0z" />
    <path fill="#FFB900" d="M12.5 0H24v11.5H12.5z" />
    <path fill="#00B04F" d="M0 12.5h11.5V24H0z" />
    <path fill="#FF3A21" d="M12.5 12.5H24V24H12.5z" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);



const ArrowRightIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

/* ─── Main Component ──────────────────────────────────────────── */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  /* API call to localhost:5000/api/auth/login */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/${loginUser}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
      } else {
        setSuccess("Login successful! Redirecting to your library…");
        if (data.token) localStorage.setItem("token", data.token);
        navigate(`${data.path}`)
        // TODO: navigate("/dashboard") — add React Router if needed
      }
    } catch {
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Google Font + keyframe animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
        @keyframes slowZoom  { from{transform:scale(1)} to{transform:scale(1.08)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn   { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        .anim-zoom   { animation: slowZoom  20s ease-in-out infinite alternate; }
        .anim-fadeup { animation: fadeUp    1s  ease         0.3s both; }
        .anim-slide  { animation: slideIn   0.7s ease              both; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm flex h-screen w-screen overflow-hidden bg-[#f8f9ff]">

        {/* ════════════════════════════════════════
            LEFT — Image / Brand Panel (50 %)
        ════════════════════════════════════════ */}
        <div className="relative hidden md:flex md:w-1/2 bg-[#0d1b4b] overflow-hidden flex-shrink-0">
          {/* Photo */}
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80"
            alt="Library"
            className="anim-zoom absolute inset-0 w-full h-full object-cover opacity-50"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-[#0d1b4b]/85" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center p-10 w-full text-white">



            {/* Quote block */}
            <div className="anim-fadeup">
              <blockquote className="font-playfair text-3xl font-semibold leading-snug mb-5 max-w-sm">
                "Empowering Education Through Digital Excellence."
              </blockquote>

              {/* Indicator dots */}
              <div className="flex items-center gap-1.5 mt-6">
                <span className="w-5 h-1.5 bg-white rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            RIGHT — Login Panel (50 %)
        ════════════════════════════════════════ */}
        <div className="anim-slide w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12 relative overflow-y-auto">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <h1 className="font-playfair text-[2rem] font-bold text-gray-900 mb-1">
              Welcome Back...
            </h1>
            <p className="text-sm text-gray-500 mb-7">
              Enter your credentials to login.
            </p>

            {/* ── Error banner ── */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* ── Success banner ── */}
            {success && (
              <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 mb-5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </div>
            )}

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Login As Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="loginUser"
                  className="block text-[11px] font-semibold text-gray-600 mb-1.5 tracking-widest uppercase"
                >
                  Login As
                </label>

                <select
                  id="loginUser"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="students">Student</option>
                  <option value="teachers">Teacher</option>
                </select>
              </div>

              {/* Email field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold text-gray-600 mb-1.5 tracking-widest uppercase"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <MailIcon />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@cams.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold text-gray-600 mb-1.5 tracking-widest uppercase"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end mb-6">
                <a href="#" className="text-xs text-blue-600 font-medium hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-200"
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRightIcon />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 whitespace-nowrap">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow-sm active:scale-[0.98] transition-all"
              >
                <MicrosoftIcon />
                Microsoft
              </button>
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500">
              New Application?{" "}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}