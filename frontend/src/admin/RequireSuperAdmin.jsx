import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireSuperAdmin({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p style={{ padding: 40 }}>Verificando permisos...</p>;
  }

  if (!user || user.role !== "SUPER_ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
