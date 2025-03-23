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
      // handle error
    }
  };

  console.log("token",token)

  console.log("user",token)

  const fetchAuthData = async () => {
    await getUser();
    await getAuthSession();
  };
  useEffect(() => {
    if (!user) {
      fetchAuthData();
    }
  }, [user, token]);

  useEffect(() => {
    // If a user exists (i.e. is authenticated), redirect to products page.
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
