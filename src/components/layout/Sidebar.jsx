
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  Bell, 
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Components",
      icon: <FileText size={20} />,
      path: "/dashboard/components",
    },
    {
      title: "Report",
      icon: <Calendar size={20} />,
      path: "/dashboard/posts",
      hasSubmenu: true,
    },
  ];

  // Toggle button that appears on the right edge of the sidebar
  const SidebarToggleButton = () => (
    <button 
      className="absolute top-20 -right-4 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors z-10"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );

  // Collapsed sidebar view
  if (!isOpen) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 h-[calc(100vh-64px)] flex flex-col items-center py-6 relative">
        <SidebarToggleButton />
        
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`p-3 rounded-lg mb-2 ${
              isActive(item.path) ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label={item.title}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    );
  }

  // Expanded sidebar view
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto relative">
      <SidebarToggleButton />
      
      <div className="py-6 px-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-3 py-2.5 rounded-lg mb-2 ${
              isActive(item.path) 
                ? "bg-primary text-white font-medium" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className={`mr-3 ${isActive(item.path) ? "text-white" : "text-gray-500"}`}>
              {item.icon}
            </span>
            <span>{item.title}</span>
            {item.hasSubmenu && (
              <ChevronRight size={16} className="ml-auto" />
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
