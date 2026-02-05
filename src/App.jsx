import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import BootcampPage from "./pages/BootcampPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/bootcamp/:id" element={<BootcampPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;