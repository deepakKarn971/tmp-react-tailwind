
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkCookie } from "../utils/cookieUtils";
import { AUTH_CONFIG } from "../config/env";
import DashboardLayout from "../components/layout/DashboardLayout";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This will run on every navigation/location change
    // Check if user is authenticated
    if (!checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME)) {
      navigate("/auth/login");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transactions Aggregated</h2>
          <div className="mb-4 flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 rounded-md">12 months</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">30 days</button>
            <button className="px-3 py-1 bg-primary text-white rounded-md">7 days</button>
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Transaction chart will appear here</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Users Aggregated</h2>
          <div className="mb-4 flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 rounded-md">12 months</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">30 days</button>
            <button className="px-3 py-1 bg-primary text-white rounded-md">7 days</button>
          </div>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Users chart will appear here</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">First Time Users</h2>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">First time users data will appear here</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Repeat Users</h2>
          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Repeat users data will appear here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
