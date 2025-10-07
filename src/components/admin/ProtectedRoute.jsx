// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { alertError } from "../../utils/alert";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    // Belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    alertError("Unauthorized: you are not Hasbi Rizaldi");
    return <Navigate to="/login" replace />;
  }

  return children; // Login & role sesuai → render halaman
};

export default ProtectedRoute;
