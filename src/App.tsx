
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      {/* Redirect from root to login page */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
