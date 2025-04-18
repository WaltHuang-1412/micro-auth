import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GlobalStyle from "./components/GlobalStyle/index";

export default function Root() {
  const isProd = location.pathname.startsWith("/micro-root");
  const basePath = isProd ? "/micro-root/auth" : "/auth";

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
