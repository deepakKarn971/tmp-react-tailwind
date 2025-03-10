
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
      "transaction-report": "Transaction Report",
      "refund-report": "Refund Report",
    };
    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4">
      <Link to="/dashboard" className="flex items-center hover:text-primary transition-colors">
        <Home size={16} />
        <span className="ml-1">Home</span>
      </Link>
      
      {pathnames.map((value, index) => {
        // Skip 'dashboard' in the breadcrumb as we already show Home
        if (value === "dashboard" && index === 0) return null;

        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <ChevronRight size={16} className="mx-2" />
            {isLast ? (
              <span className="font-medium text-gray-900">
                {getReadableName(value)}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-primary transition-colors"
              >
                {getReadableName(value)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
