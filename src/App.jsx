import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

// Placeholder components for dashboard routes
const Components = () => <div className="p-8"><h1 className="text-2xl font-bold">Components Page</h1></div>;
const Reports = () => <div className="p-8"><h1 className="text-2xl font-bold">Reports Overview</h1></div>;
const TransactionReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Transaction Report Page</h1></div>;
const RefundReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Refund Report Page</h1></div>;

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      
      {/* Dashboard routes with common layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="components" element={<Components />} />
        
        {/* Reports section with nested routes */}
        <Route path="reports" element={<Reports />} />
        <Route path="reports/transaction-report" element={<TransactionReport />} />
        <Route path="reports/refund-report" element={<RefundReport />} />
        
        {/* Keep backwards compatibility for existing direct routes */}
        <Route path="transaction-report" element={<Navigate to="/dashboard/reports/transaction-report" replace />} />
        <Route path="refund-report" element={<Navigate to="/dashboard/reports/refund-report" replace />} />
      </Route>
      
      {/* Redirect from root to login page */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
