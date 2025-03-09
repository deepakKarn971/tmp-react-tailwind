
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkCookie, deleteCookie } from "../utils/cookieUtils";
import { AUTH_CONFIG } from "../config/env";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This will run on every navigation/location change
    // Check if user is authenticated
    if (!checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME)) {
      navigate("/auth/login", { replace: true });
      return;
    }

    // Fetch user data (this is a placeholder)
    // In a real app, you would fetch user data from an API using the token
    const fetchData = async () => {
      try {
        setLoading(false);
        setUserData({ 
          name: "User",
          email: "user@example.com"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, location]);

  const handleLogout = () => {
    deleteCookie(AUTH_CONFIG.AUTH_COOKIE_NAME);
    navigate("/auth/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-black rounded-full p-2 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-2xl font-bold">twid</span>
            <sup className="text-xs">™</sup>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="mb-4">Welcome to your dashboard!</p>
          {userData && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
