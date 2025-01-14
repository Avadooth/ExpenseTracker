import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update the state when the token is retrieved
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar token={isLoggedIn} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
