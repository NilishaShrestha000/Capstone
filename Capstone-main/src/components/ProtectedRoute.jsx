import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Replace this placeholder with your actual authentication logic
  // (e.g., pulling a user token from localStorage, context, or a state manager)
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  // If logged in, render the child route (via <Outlet />)
  // If not logged in, redirect them to the home page (or a "/login" page)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
