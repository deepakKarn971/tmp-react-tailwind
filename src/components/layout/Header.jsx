
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User, Menu } from "lucide-react";
import { deleteCookie } from "../../utils/cookieUtils";
import { AUTH_CONFIG } from "../../config/env";

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    deleteCookie(AUTH_CONFIG.AUTH_COOKIE_NAME);
    navigate("/auth/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-3 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="text-xl font-semibold">Dashboard</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                <User size={18} />
              </div>
              <span className="font-medium">deepak karn</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full min-w-[192px] bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold">Account Actions</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
