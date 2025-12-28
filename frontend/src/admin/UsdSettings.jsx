import { useEffect, useState } from "react";
import api from "../api/axios";
import { adminUsdSettings } from "../styles";

export default function UsdSettings() {
  const [current, setCurrent] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await api.get("/settings/usd");
    setCurrent(res.data.usd_to_ars);
    setPrevious(res.data.previous_usd_to_ars);
    setUpdatedAt(res.data.updated_at);
  };

  const guardar = async () => {
    if (!value) return;
    await api.put(`/settings/usd?value=${value}`);
    setValue("");
    cargar();
  };

  return (
    <div style={adminUsdSettings.wrapper}>
      <h1 style={adminUsdSettings.title}>Valor del dólar</h1>

      <div style={adminUsdSettings.card}>
        <p style={adminUsdSettings.labelStrong}>
          <strong>Valor actual:</strong> ARS {current}
        </p>

        {previous && (
          <p style={adminUsdSettings.muted}>
            Valor anterior: ARS {previous}
          </p>
        )}

        {updatedAt && (
          <p style={adminUsdSettings.mutedSmall}>
            Última modificación:{" "}
            {new Date(updatedAt).toLocaleString()}
          </p>
        )}

        <input
          type="number"
          placeholder="Nuevo valor USD → ARS"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={adminUsdSettings.input}
        />

        <button style={adminUsdSettings.button} onClick={guardar}>
          Actualizar valor
        </button>
      </div>
    </div>
  );
}
