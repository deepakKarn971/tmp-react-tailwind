
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "../navigation/Breadcrumbs";
import { checkCookie } from "../../utils/cookieUtils";
import { AUTH_CONFIG } from "../../config/env";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME)) {
      navigate("/auth/login");
      return;
    }

    // Fetch user data (this is a placeholder)
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
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Breadcrumbs />
          <Outlet /> {/* This renders the child route components */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
