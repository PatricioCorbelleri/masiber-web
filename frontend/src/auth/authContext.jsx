import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/admin/auth/login", {
      username,
      password,
    });

    const { token, admin } = res.data;

    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(admin));

    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
