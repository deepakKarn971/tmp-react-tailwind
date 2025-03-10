
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Create mapping for readable names (can be expanded as needed)
  const getReadableName = (path) => {
    const pathMap = {
      dashboard: "Dashboard",
      components: "Components",
      reports: "Reports",
      "transaction-report": "Transaction Report",
      "refund-report": "Refund Report",
      income: "Income",
      audience: "Audience",
      settings: "Settings",
      earnings: "Earnings",
      refunds: "Refunds",
      declines: "Declines",
      payouts: "Payouts",
      overview: "Overview",
      demographics: "Demographics",
      account: "Account",
      security: "Security",
      posts: "Posts",
      schedules: "Schedules",
      notification: "Notification"
    };
    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  // Create a mapping for parent-child relationships
  const getParentPath = (path) => {
    const relationships = {
      "transaction-report": "reports",
      "refund-report": "reports",
      "earnings": "income",
      "refunds": "income",
      "declines": "income",
      "payouts": "income",
      "overview": "audience",
      "demographics": "audience",
      "account": "settings",
      "security": "settings"
    };
    return relationships[path];
  };

  // Build breadcrumb items with parent-child relationships
  const buildBreadcrumbItems = () => {
    const items = [];
    let currentPath = "";

    for (let i = 0; i < pathnames.length; i++) {
      const path = pathnames[i];
      
      // Skip 'dashboard' in the breadcrumb as we already show Home
      if (path === "dashboard" && i === 0) continue;
      
      // Check if current path has a parent that needs to be inserted
      const parentPath = getParentPath(path);
      if (parentPath && !pathnames.includes(parentPath)) {
        const parentFullPath = currentPath ? `${currentPath}/${parentPath}` : `/${parentPath}`;
        items.push({
          name: getReadableName(parentPath),
          path: `/dashboard/${parentPath}`,
          isLast: false
        });
      }
      
      // Add current path
      currentPath = currentPath ? `${currentPath}/${path}` : `/${path}`;
      items.push({
        name: getReadableName(path),
        path: i === 0 ? `/dashboard` : currentPath.startsWith('/') ? currentPath : `/${currentPath}`,
        isLast: i === pathnames.length - 1
      });
    }

    return items;
  };

  const breadcrumbItems = buildBreadcrumbItems();

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4">
      <Link to="/dashboard" className="flex items-center hover:text-primary transition-colors">
        <Home size={16} />
        <span className="ml-1">Home</span>
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight size={16} className="mx-2" />
          {item.isLast ? (
            <span className="font-medium text-gray-900">
              {item.name}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
