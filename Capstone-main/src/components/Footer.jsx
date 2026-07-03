import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2 text-white font-semibold tracking-wide">
            <span className="text-blue-500">🇳🇵</span> Nepal Tourism Insights
          </div>
          <p className="text-xs text-slate-500">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        {/* Right Side: Quick Links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="hover:text-white transition-colors duration-200"
            >
              Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/forecast"
              className="hover:text-white transition-colors duration-200"
            >
              Forecasts
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="hover:text-white transition-colors duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Admin Portal
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
