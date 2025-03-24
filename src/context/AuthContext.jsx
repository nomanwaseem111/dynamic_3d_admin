"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
export const createAuthContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (err) {
      // toast.error("Error fetching user");
    }
  };

  const getAuthSession = async () => {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      if (tokens) {
        document.cookie = `token=${tokens.idToken}; path=/;`;
        localStorage.setItem("token", tokens.idToken);
        setToken(tokens.idToken);
      }
    } catch (err) {
      // handle error appropriately
    }
  };

  console.log("token", token);

  console.log("user", token);

  const fetchAuthData = async () => {
    document.cookie = "refreshing=true; path=/;";

    await getUser();
    await getAuthSession();

    document.cookie =
      "refreshing=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };
  useEffect(() => {
    if (!user) {
      fetchAuthData();
    }
  }, [user, token]);

  useEffect(() => {
    if (user) {
      router.push("/products");
    }
  }, [user, router]);

  const states = {
    user,
    token,
  };
  const setters = {
    setUser,
    setToken,
  };
  const actions = {
    getUser,
    getAuthSession,
    fetchAuthData,
  };

  const values = {
    states,
    actions,
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
