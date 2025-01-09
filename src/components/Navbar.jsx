import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold text-primary">
          <Link to="/">ExpenseTracker</Link>
        </div>
        <div className="space-x-4">
          <Link className="text-gray-700 hover:text-primary transition-all duration-300" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-700 hover:text-primary transition-all duration-300" to="/analytics">Analytics</Link>
          <Link className="text-gray-700 hover:text-primary transition-all duration-300" to="/profile">Profile</Link>
          <Link className="text-gray-700 hover:text-primary transition-all duration-300" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
