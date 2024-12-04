import React from "react";

const Navbar = () => {
  return (
    <nav className="text-purple-800 p-4 absolute w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-bold">Brand</a>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:text-purple-600 transition-colors">Home</a></li>
          <li><a href="#about" className="hover:text-purple-600 transition-colors">About</a></li>
          <li><a href="#contact" className="hover:text-purple-600 transition-colors">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
