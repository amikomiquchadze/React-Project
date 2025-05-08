// src/components/Logout.tsx
import React, { useEffect } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null; // Nothing visible
};

export default Logout;
