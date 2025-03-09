
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Placeholder components for new routes
const Components = () => <div className="p-8"><h1 className="text-2xl font-bold">Components Page</h1></div>;
const TransactionReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Transaction Report Page</h1></div>;
const RefundReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Refund Report Page</h1></div>;

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      
      {/* Dashboard routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/components" element={<Components />} />
      <Route path="/dashboard/transaction-report" element={<TransactionReport />} />
      <Route path="/dashboard/refund-report" element={<RefundReport />} />
      
      {/* Redirect from root to login page */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
