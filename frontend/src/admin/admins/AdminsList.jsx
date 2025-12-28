import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { adminLayout as s } from "../../styles";

export default function AdminsList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admins"); // ✅ RUTA CORRECTA
      setAdmins(res.data || []);
    } catch (err) {
      console.error("Error cargando admins:", err);
      setError("No se pudieron cargar los administradores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (admin) => {
    if (!window.confirm(`Eliminar al administrador ${admin.username}?`)) return;

    try {
      await api.delete(`/admins/${admin.id}`); // ✅ RUTA CORRECTA
      load();
    } catch (err) {
      alert("No se pudo eliminar el administrador");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>Administradores</h1>

        <Link to="/admin/admins/crear" style={s.btnPrimary}>
          + Nuevo administrador
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Usuario</th>
              <th style={s.th}>Rol</th>
              <th style={s.th}>Activo</th>
              <th style={{ ...s.th, textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((a) => (
              <tr key={a.id}>
                <td style={s.td}>{a.username}</td>
                <td style={s.td}>{a.role}</td>
                <td style={s.td}>{a.is_active ? "Sí" : "No"}</td>

                <td style={{ ...s.td, textAlign: "right" }}>
                  <Link
                    to={`/admin/admins/editar/${a.id}`}
                    style={s.btnEdit}
                  >
                    Editar
                  </Link>

                  <button
                    style={s.btnDelete}
                    onClick={() => remove(a)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
