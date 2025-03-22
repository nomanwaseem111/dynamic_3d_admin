"use client";
import React, { createContext, useContext, useState } from "react";

export const createAuthContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const states = {
    user,
  };
  const setters = {
    setUser,
  };

  const values = {
    states,
    setters,
  };

  return (
    <createAuthContext.Provider value={values}>
      {children}{" "}
    </createAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(createAuthContext);
  if (context === undefined) {
    throw new Error("useLoggedIn must be used within a LoggedInProvider");
  }
  return context;
};
