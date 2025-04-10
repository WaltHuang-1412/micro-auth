import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GlobalStyle from "./components/GlobalStyle/index";

export default function Root() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter
        basename={
          process.env.NODE_ENV === "production" ? "/micro-root/auth" : "/"
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
