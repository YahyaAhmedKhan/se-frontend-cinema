import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="w-full p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/home" className="text-2xl font-bold text-red-600">
          Movie Ticketing System
        </Link>
        <div className="flex space-x-4 font-semibold">
          <Link to="/home" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/movies" className="hover:text-red-600">
            Movies
          </Link>
          <Link className="hover:text-red-600">Book Tickets</Link>
          <Link className="hover:text-red-600">Contact</Link>
          <Link to="/login" className="hover:text-red-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
