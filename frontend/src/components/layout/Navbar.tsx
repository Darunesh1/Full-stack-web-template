import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const { accessToken, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <Link to="/dashboard" className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
        Hackathon
      </Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        {accessToken && (
          <button
            onClick={logout}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;