
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
  ChevronDown, 
  ChevronRight, 
  X,
  ChevronLeft
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = React.useState({
    audience: false,
    income: false,
    settings: false,
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isSubActive = (paths) => {
    return paths.some(path => location.pathname.includes(path));
  }

  const sidebarItems = [
    {
      category: "MAIN",
      items: [
        {
          title: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          path: "/dashboard",
        },
        {
          title: "Audience",
          icon: <Users size={20} />,
          hasSubmenu: true,
          menu: "audience",
          subItems: [
            {
              title: "Overview",
              path: "/dashboard/audience/overview",
            },
            {
              title: "Demographics",
              path: "/dashboard/audience/demographics",
            },
          ],
        },
        {
          title: "Posts",
          icon: <FileText size={20} />,
          path: "/dashboard/posts",
        },
        {
          title: "Schedules",
          icon: <Calendar size={20} />,
          path: "/dashboard/schedules",
        },
        {
          title: "Income",
          icon: <DollarSign size={20} />,
          hasSubmenu: true,
          menu: "income",
          subItems: [
            {
              title: "Earnings",
              path: "/dashboard/income/earnings",
            },
            {
              title: "Refunds",
              path: "/dashboard/income/refunds",
            },
            {
              title: "Declines",
              path: "/dashboard/income/declines",
            },
            {
              title: "Payouts",
              path: "/dashboard/income/payouts",
            },
          ],
        },
      ],
    },
    {
      category: "SETTINGS",
      items: [
        {
          title: "Notification",
          icon: <Bell size={20} />,
          path: "/dashboard/notification",
        },
        {
          title: "Settings",
          icon: <Settings size={20} />,
          hasSubmenu: true,
          menu: "settings",
          subItems: [
            {
              title: "Account",
              path: "/dashboard/settings/account",
            },
            {
              title: "Security",
              path: "/dashboard/settings/security",
            },
          ],
        },
      ],
    },
  ];

  if (!isOpen) return (
    <div className="w-12 bg-white border-r border-gray-200 h-[calc(100vh-64px)] flex items-center justify-center">
      <button 
        className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto relative">
      <div className="py-4 flex flex-col h-full">
        <div className="flex items-center justify-between px-4 mb-6">
          <div className="flex items-center">
            <div className="bg-gray-700 rounded-full p-2 mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" fill="white" />
              </svg>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold">Logoipsum</span>
            </div>
          </div>
          <button 
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-3">
          {sidebarItems.map((categoryGroup, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <div className="text-xs font-semibold text-gray-500 px-3 mb-2">
                {categoryGroup.category}
              </div>
              <ul className="space-y-1">
                {categoryGroup.items.map((item, index) => (
                  <li key={index}>
                    {item.hasSubmenu ? (
                      <div className="flex flex-col">
                        <button
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                            isSubActive(item.subItems.map(si => si.path)) ? "bg-gray-100 font-medium" : ""
                          }`}
                          onClick={() => toggleMenu(item.menu)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-gray-500">{item.icon}</span>
                            <span>{item.title}</span>
                          </div>
                          <span>
                            {expandedMenus[item.menu] ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </span>
                        </button>
                        {expandedMenus[item.menu] && (
                          <ul className="pl-10 mt-1 space-y-1">
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.path}
                                  className={`block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                                    isActive(subItem.path) ? "bg-gray-100 font-medium" : ""
                                  }`}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                          isActive(item.path) ? "bg-gray-100 font-medium" : ""
                        }`}
                      >
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Toggle arrow at the bottom */}
        <div className="px-4 py-3 border-t border-gray-200">
          <button 
            className="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-100 text-gray-500"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <ChevronLeft size={20} />
            <span className="ml-2 text-sm">Collapse</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

