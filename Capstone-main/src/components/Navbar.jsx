import React from 'react';

const Navbar = () => {
  // Define the navigation links data
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Forecasts', path: '/forecasts' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-linear-to-r from-blue-500 to-sky-400 text-white shadow-md font-sans">
      
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        {/* Container for the logo graphic */}
        <div className="w-8 h-8  flex items-center justify-center">
          <img src='logo.png'></img>
        </div>
        <span className="text-xl font-semibold tracking-wide hidden sm:block">
          Nepal Tourism Insights
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6 md:gap-8">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.path} 
              className="text-sm md:text-base font-medium opacity-90 hover:opacity-100 transition-opacity duration-200 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

    </nav>
  );
};

export default Navbar;