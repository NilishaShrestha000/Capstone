import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic structural validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Mock Authentication Simulation
      // Replace this block with your actual backend axios/fetch POST request
      setTimeout(() => {
        if (email === "admin@insights.com" && password === "admin123") {
          // Set authentication token for ProtectedRoute to read
          localStorage.setItem("token", "mock-jwt-token-xyz");

          setIsLoading(false);
          // Redirect the authenticated user straight to the Admin area
          navigate("/admin");
        } else {
          setIsLoading(false);
          setError("Invalid email or password credentials.");
        }
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError("A system error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-900 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl">
        {/* Branding header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Admin Portal
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to upload datasets and manage analytical pipelines
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@insights.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
              isLoading
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
            }`}
          >
            {isLoading ? "Verifying Credentials..." : "Sign In"}
          </button>
        </form>

        {/* Informational Help Box */}
        <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500">
            Demo Access:{" "}
            <span className="text-slate-400 font-mono">admin@insights.com</span>{" "}
            / <span className="text-slate-400 font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
