"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { fetchApi } from "@/utils/fetchApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("spyne-jwt-token");
    const userData = Cookies.get("userData");

    if (token) {
      setUser({
        loggedIn: true,
        data: userData ? JSON.parse(userData) : null,
      });
    } else {
      setUser({ loggedIn: false });
      router.push("/auth/login");
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetchApi("/auth/login", { email, password }, "POST");
    console.log(res);
    const data = res;

    if (data.token) {
      Cookies.set("spyne-jwt-token", data.token, { expires: 1 });
      Cookies.set("userData", JSON.stringify(data.user), { expires: 1 });

      setUser({
        loggedIn: true,
        data: data.user,
      });

      router.push("/");
    }
  };

  const logout = () => {
    Cookies.remove("spyne-jwt-token");
    Cookies.remove("userData"); // Remove user data from cookies on logout
    setUser({ loggedIn: false });
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
