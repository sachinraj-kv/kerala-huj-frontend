import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Home from "@/Layout/Home";
import Details from "@/pages/Details";
import Reports from "@/pages/Reports";
import Login from "@/auth/Login";
import StateReciptPdf from "@/recipt/StateReciptPdf";
import ProtectedRoute from "./protectedRoute";
import ReportTable from "@/pages/ReportTable";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record/details/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Report/:id"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipt/"
          element={
            <ProtectedRoute>
              <StateReciptPdf />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/record/table"
        element={
          <ProtectedRoute>
                <ReportTable/>
          </ProtectedRoute>
        
        }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;

