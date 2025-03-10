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

  const cookie = getCookie(AUTH_CONFIG.AUTH_COOKIE_NAME);
  useEffect(() => {
    // Check if user is authenticated
    // setCookie(AUTH_CONFIG.AUTH_COOKIE_NAME, data.token, AUTH_CONFIG.TOKEN_EXPIRY_DAYS);
    if (!checkCookie(AUTH_CONFIG.AUTH_COOKIE_NAME)) {
      // navigate("/auth/login");
      setCookie(
        AUTH_CONFIG.AUTH_COOKIE_NAME,
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwczovL21lcmNoYW50LWN1Zy50d2lkcGF5LmNvbS9kYXNoYm9hcmQvYXV0aC1kYXNoYm9hcmQvdjEvbG9naW4iLCJpYXQiOjE3NDE1ODUxMDIsImV4cCI6MTc0MTU4ODcwMiwibmJmIjoxNzQxNTg1MTAyLCJqdGkiOiJLWXNrZTlHcUtPMlduekVuIiwic3ViIjoiNzM2IiwicHJ2IjoiOWM5MzNhNzkwODYyZTFhNWRiZWMyMzdjZGM1OTJhNWEzZTE2OTYzOCJ9.gD62gRElaByoOp-PuXc1PlSgtDU5cBJdkWCO8hPD7kyECtIPfAgo-AS1x0FaW1K41wWd7hPhkUH9wXErnlcelaiIBl-_J-4sZm3-w2IdQEPlZDbQgjcp0hpJ3Ng6iNnDBxujV3cwgrvT-IXGy1UqM6fc8SUI5zHxcXOYwihf4siDYCPTYJGNpIfM9HLIfi_DV4bnQ6u-vBfXdD_JxqPltMH63bJ2UXX7GtpyAObSSCikGyP9lhQ218Pu_pZo_0lq_5irGHstDrvcUj_3UuztszEg81Lb9cNl6FoP5LRMMk0kEyIPzqS3rCWjYmFoFWOrODNqBFLiSlo9IzS1ziauxVFV6H7k9_1203yfBlFRkmZbXz-omwgicKGhJO0rIpZhx_lxFueob57f3i_j5YpNpY-OXn3MswL8XWS9-VbN5FNTj3p6fNQgoi_5BQRPVGwgUXEpfhZJQ0Z7sMmyE2h-3wmmImQ5vkcvvEpSi3G3lXui9iT3d3avX1pOY0A4kk4zL3juaqZg41De-OBD-kSoEAe0rUwMcX2DJdI6AO8J-8yZADuYVKKzLmxZbgzPASKPQy0mg4k1f_AvHOFeOr-kb9JOnsxkOc5cHULxqrmo4rXbsygg0Q2-FsUnvdljeuivATwZk7WnA-cpPNKpssVGREy8KV0WIzU9BzdhkSO3jtQ",
        AUTH_CONFIG.TOKEN_EXPIRY_DAYS
      );
      // return;
    }

    // Fetch user data (this is a placeholder)
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
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300`}
        >
          <Breadcrumbs />
          <div>{cookie}</div>
          <Outlet /> {/* This renders the child route components */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
