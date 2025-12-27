import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const UsdContext = createContext();

export function UsdProvider({ children }) {
  const [usd, setUsd] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarUsd = async () => {
    try {
      const res = await api.get("/settings/usd");
      setUsd(res.data);
    } catch (err) {
      console.error("Error cargando USD", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsd();
  }, []);

  return (
    <UsdContext.Provider value={{ usd, loading, reload: cargarUsd }}>
      {children}
    </UsdContext.Provider>
  );
}

export function useUsd() {
  return useContext(UsdContext);
}
