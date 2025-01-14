import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <AuthRedirect isLoggedIn={isLoggedIn} />
      <div className="flex flex-col min-h-screen">
        <Navbar token={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute token={isLoggedIn}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute token={isLoggedIn}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const AuthRedirect = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Redirecting. Current Path:", location.pathname, "Logged In:", isLoggedIn);
    if (isLoggedIn && ["/", "/signup"].includes(location.pathname)) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return null;
};

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" replace />;
};

export default App;
