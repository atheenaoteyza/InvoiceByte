import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Register, Login } from "./pages";

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Register></Register>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
