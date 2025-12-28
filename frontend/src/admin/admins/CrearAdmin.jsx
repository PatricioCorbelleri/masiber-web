import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { adminLayout as s } from "../../styles";

export default function CrearAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const save = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      alert("Usuario y contraseña son obligatorios");
      return;
    }

    await api.post("/admin/users", form);
    navigate("/admin/admins");
  };

  return (
    <div>
      <h1>Crear administrador</h1>

      <div style={s.card}>
        <div style={s.field}>
          <label>Usuario</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            style={s.input}
          />
        </div>

        <div style={s.field}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            style={s.input}
          />
        </div>

        <div style={s.field}>
          <label>Rol</label>
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            style={s.input}
          >
            <option value="ADMIN">Administrador</option>
            <option value="SUPER_ADMIN">Super administrador</option>
          </select>
        </div>

        <div style={s.actions}>
          <button style={s.btnCancel} onClick={() => navigate(-1)}>
            Cancelar
          </button>

          <button style={s.btnPrimary} onClick={save}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
