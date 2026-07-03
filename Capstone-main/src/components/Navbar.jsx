import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Analytics", path: "/analytics" },
    { name: "Forecasts", path: "/forecast" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact", path: "/contacts" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 text-slate-200 px-8 py-4 flex items-center justify-between font-sans sticky top-0 z-50 backdrop-blur-md bg-slate-900/90">
      {/* Brand Logo & Title */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <img
            src="logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xl font-bold tracking-wide text-white group-hover:text-sky-400 transition-colors duration-200 hidden sm:block">
          Nepal Tourism <span className="text-sky-500">Insights</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6 md:gap-8">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.path;

          return (
            <li key={index}>
              <Link
                to={link.path}
                className={`text-sm md:text-base font-medium transition-all duration-200 relative py-1
                  ${
                    isActive
                      ? "text-sky-400 opacity-100"
                      : link.name === "Login"
                        ? "text-emerald-400 hover:text-emerald-300 opacity-90 hover:opacity-100"
                        : "text-slate-300 hover:text-white opacity-80 hover:opacity-100"
                  }
                  /* Active or hover bottom slide indicator line */
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
                  ${link.name === "Login" ? "after:bg-emerald-500" : "after:bg-sky-500"}
                  after:transition-transform after:duration-200
                  ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                `}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
