
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
