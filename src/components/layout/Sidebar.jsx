
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  BarChart2,
  CircleDot
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    report: location.pathname.includes("/dashboard/reports")
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isSubmenuActive = (parentKey) => {
    const paths = {
      report: ["/dashboard/reports/transaction-report", "/dashboard/reports/refund-report"]
    };
    
    return paths[parentKey] && paths[parentKey].some(path => location.pathname === path);
  };

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
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
      icon: <BarChart2 size={20} />,
      key: "report",
      hasSubmenu: true,
      submenuItems: [
        {
          title: "Transaction Report",
          path: "/dashboard/reports/transaction-report",
        },
        {
          title: "Refund Report",
          path: "/dashboard/reports/refund-report",
        }
      ]
    },
  ];

  // Toggle button that appears on the right edge of the sidebar
  const SidebarToggleButton = () => (
    <button 
      className="absolute -right-3 top-20 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors z-20"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  );

  // Render submenu items
  const renderSubmenuItems = (items) => {
    return items.map((item, index) => (
      <Link
        key={index}
        to={item.path}
        className={`flex items-center pl-12 py-2.5 text-sm ${
          isActive(item.path) 
            ? "text-primary font-medium" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <CircleDot className="w-4 h-4 mr-2 text-gray-400" />
        <span>{item.title}</span>
      </Link>
    ));
  };

  // Collapsed sidebar view
  if (!isOpen) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 h-[calc(100vh-64px)] flex flex-col items-center py-6 relative">
        <SidebarToggleButton />
        
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2 w-full px-2">
            {item.hasSubmenu ? (
              <button
                className={`p-3 w-full flex justify-center ${
                  expandedMenus[item.key] || isSubmenuActive(item.key) ? "bg-gray-100" : ""
                } text-gray-500 hover:bg-gray-100`}
                onClick={() => toggleSubmenu(item.key)}
                aria-label={item.title}
              >
                {item.icon}
              </button>
            ) : (
              <Link
                to={item.path}
                className={`p-3 w-full flex justify-center ${
                  isActive(item.path) ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
                aria-label={item.title}
              >
                {item.icon}
              </Link>
            )}
          </div>
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
          <div key={index} className="mb-2">
            {item.hasSubmenu ? (
              <div>
                <button
                  onClick={() => toggleSubmenu(item.key)}
                  className={`flex items-center w-full px-3 py-2.5 ${
                    expandedMenus[item.key] || isSubmenuActive(item.key) ? "bg-gray-100" : ""
                  } text-gray-700 hover:bg-gray-100`}
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  <span>{item.title}</span>
                  <span className="ml-auto">
                    {expandedMenus[item.key] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                </button>
                {expandedMenus[item.key] && (
                  <div className="mt-1">
                    {renderSubmenuItems(item.submenuItems)}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2.5 ${
                  isActive(item.path) 
                    ? "bg-primary text-white font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`mr-3 ${isActive(item.path) ? "text-white" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
