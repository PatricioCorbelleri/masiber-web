import { createContext, useContext, useState } from "react";
import { api } from "../api/axios";

/* =====================
   CONTEXTO
===================== */

export const AuthContext = createContext(null);

/* =====================
   PROVIDER
===================== */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login simple (sin token por ahora)
  const login = async (username, password) => {
    const res = await api.post("/auth/login", {
      username,
      password,
    });

    setUser(res.data); // backend devuelve el usuario
    return res.data;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* =====================
   HOOK
===================== */

export function useAuth() {
  return useContext(AuthContext);
}
