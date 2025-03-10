import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";

// Placeholder components for dashboard routes
const Components = () => <div className="p-8"><h1 className="text-2xl font-bold">Components Page</h1></div>;
const TransactionReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Transaction Report Page</h1></div>;
const RefundReport = () => <div className="p-8"><h1 className="text-2xl font-bold">Refund Report Page</h1></div>;
const AudienceOverview = () => <div className="p-8"><h1 className="text-2xl font-bold">Audience Overview</h1></div>;
const AudienceDemographics = () => <div className="p-8"><h1 className="text-2xl font-bold">Audience Demographics</h1></div>;
const Posts = () => <div className="p-8"><h1 className="text-2xl font-bold">Posts Page</h1></div>;
const Schedules = () => <div className="p-8"><h1 className="text-2xl font-bold">Schedules Page</h1></div>;
const Earnings = () => <div className="p-8"><h1 className="text-2xl font-bold">Earnings Page</h1></div>;
const Refunds = () => <div className="p-8"><h1 className="text-2xl font-bold">Refunds Page</h1></div>;
const Declines = () => <div className="p-8"><h1 className="text-2xl font-bold">Declines Page</h1></div>;
const Payouts = () => <div className="p-8"><h1 className="text-2xl font-bold">Payouts Page</h1></div>;
const Notification = () => <div className="p-8"><h1 className="text-2xl font-bold">Notification Page</h1></div>;
const AccountSettings = () => <div className="p-8"><h1 className="text-2xl font-bold">Account Settings Page</h1></div>;
const SecuritySettings = () => <div className="p-8"><h1 className="text-2xl font-bold">Security Settings Page</h1></div>;

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
        
        {/* Report routes */}
        <Route path="reports/transaction-report" element={<TransactionReport />} />
        <Route path="reports/refund-report" element={<RefundReport />} />
        
        {/* Audience routes */}
        <Route path="audience/overview" element={<AudienceOverview />} />
        <Route path="audience/demographics" element={<AudienceDemographics />} />
        
        {/* Posts route */}
        <Route path="posts" element={<Posts />} />
        
        {/* Schedules route */}
        <Route path="schedules" element={<Schedules />} />
        
        {/* Income routes */}
        <Route path="income/earnings" element={<Earnings />} />
        <Route path="income/refunds" element={<Refunds />} />
        <Route path="income/declines" element={<Declines />} />
        <Route path="income/payouts" element={<Payouts />} />
        
        {/* Notification route */}
        <Route path="notification" element={<Notification />} />
        
        {/* Settings routes */}
        <Route path="settings/account" element={<AccountSettings />} />
        <Route path="settings/security" element={<SecuritySettings />} />
        
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
