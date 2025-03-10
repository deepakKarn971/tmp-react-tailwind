import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Breadcrumbs from "../navigation/Breadcrumbs";
import { checkCookie, getCookie, setCookie } from "../../utils/cookieUtils";
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

  // Check if current path is dashboard (to hide breadcrumbs)
  const isDashboardPath =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  useEffect(() => {
    // Check if user is authenticated
    if (!checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME)) {
      setCookie(
        AUTH_CONFIG.AUTH_COOKIE_NAME,
        window.tokenTmp,
        AUTH_CONFIG.TOKEN_EXPIRY_DAYS
      );
    }

    // Fetch user data
    const fetchData = async () => {
      try {
        setLoading(false);
        setUserData({
          name: "User",
          email: "user@example.com",
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
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto transition-all duration-300">
          {/* Only show breadcrumbs if not on the Dashboard page */}
          {!isDashboardPath && <Breadcrumbs />}
          <Outlet /> {/* This renders the child route components */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
