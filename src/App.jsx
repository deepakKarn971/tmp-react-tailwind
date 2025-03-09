
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Redirect from root to login page */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
