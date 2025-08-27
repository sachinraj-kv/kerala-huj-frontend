import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); 

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
