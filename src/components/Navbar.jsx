import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({token}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Check authentication status on component mount
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token); // Set `isLoggedIn` to true if token exists
  //   console.log("isLoggedIn_Token------>>>>>>", token);
  // }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem("token");
    toast.success("You have been logged out!");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg p-4 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold text-primary">
          <Link>ExpenseTracker</Link>
        </div>
        {token && (
          <div className="space-x-4">
            <Link
              className="text-gray-700 hover:text-primary transition-all duration-300"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-gray-700 hover:text-primary transition-all duration-300"
              to="/analytics"
            >
              Analytics
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-primary transition-all duration-300"
            >
              Logout
            </button>
          </div>
        )}
        <ToastContainer />
      </div>
    </nav>
  );
};

export default Navbar;
