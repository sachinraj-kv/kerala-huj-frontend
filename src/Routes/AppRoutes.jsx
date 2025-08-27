import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Home from "@/Layout/Home";
import Details from "@/pages/Details";
import Reports from "@/pages/Reports";
import Login from "@/auth/Login";
import StateReciptPdf from "@/recipt/StateReciptPdf";
import ReportTable from "@/pages/ReportTable";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
       
        <Route path="/login" element={<Login />} />

        
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
