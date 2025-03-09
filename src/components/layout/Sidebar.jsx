
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Layers, FileText, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({
    report: false,
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Components",
      icon: <Layers size={20} />,
      path: "/dashboard/components",
    },
    {
      title: "Report",
      icon: <FileText size={20} />,
      hasSubmenu: true,
      menu: "report",
      subItems: [
        {
          title: "Transaction Report",
          path: "/dashboard/transaction-report",
        },
        {
          title: "Refund Report",
          path: "/dashboard/refund-report",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar toggle button */}
      <button
        className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full bg-primary p-3 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 lg:z-0 h-full bg-sidebar transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        }`}
      >
        <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
          {isOpen ? (
            <div className="flex items-center">
              <div className="bg-black rounded-full p-2 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" fill="white" />
                </svg>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold">twid</span>
                <sup className="text-xs">™</sup>
              </div>
            </div>
          ) : (
            <button 
              className="p-2 rounded-md hover:bg-gray-200"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
          )}
          <button
            className="ml-auto hidden lg:block"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronRight size={20} /> : null}
          </button>
        </div>

        <div className="py-4">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <div className="flex flex-col">
                    <button
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                        expandedMenus[item.menu] ? "bg-sidebar-accent" : ""
                      }`}
                      onClick={() => toggleMenu(item.menu)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        {isOpen && <span>{item.title}</span>}
                      </div>
                      {isOpen && (
                        <span>
                          {expandedMenus[item.menu] ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </button>
                    {isOpen && expandedMenus[item.menu] && (
                      <ul className="pl-9 mt-1 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`block px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                                isActive(subItem.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="w-2 h-2 mr-2 rounded-full bg-sidebar-foreground/40"></span>
                                <span>{subItem.title}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      isActive(item.path) ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
