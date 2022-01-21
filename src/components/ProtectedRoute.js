import React from "react";
import { useUserAuth } from "./Auth";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
//   console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;