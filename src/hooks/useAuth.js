import React, { useContext } from "react";
import { AuthContext } from "../contextAPI/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth() must be used inside a ThemeProvider");
  }
  
  return context;
};


