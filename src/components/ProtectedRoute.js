import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(!user){
        navigate("/login")
      }
    });
    return unsubscribe;
  }, []);

  return children;
};

export default ProtectedRoute;