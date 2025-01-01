import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Register, Login, Home } from "./pages";
import InvoiceById from "./pages/InvoiceById";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invoice" element={<InvoiceById />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
