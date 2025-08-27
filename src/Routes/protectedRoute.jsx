import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const token = getCookie("token"); 
  
  console.log("token",token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

