import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { adminLogin } from "../styles";

/* ICONOS SVG */

const openEye = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const closedEye = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6">
    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.8 21.8 0 014.22-4.82" />
    <path d="M1 1l22 22" />
  </svg>
);


export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "MASIBER | Admin Login";
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async () => {
    try {
      await login(form.username, form.password);
      nav("/admin");
    } catch {
      alert("Login incorrecto");
    }
  };

  const cancelar = () => nav("/");

  return (
    <div style={adminLogin.container}>
      <style>{adminLogin.globalStyles}</style>

      <div style={adminLogin.card}>
        <h1 style={adminLogin.title}>Panel Administrativo</h1>
        <p style={adminLogin.subtitle}>Iniciá sesión para continuar</p>

        <input
          name="username"
          style={adminLogin.input}
          placeholder="Usuario"
          value={form.username}
          onChange={onChange}
        />

        <div style={adminLogin.passwordWrapper}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={form.password}
            onChange={onChange}
            style={{ ...adminLogin.input, paddingRight: 44, marginBottom: 0 }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={adminLogin.eyeButton}
          >
            {showPassword ? openEye : closedEye}
          </button>
        </div>

        <div style={adminLogin.buttonRow}>
          <button style={adminLogin.btnPrimary} onClick={enviar}>
            Ingresar
          </button>
          <button style={adminLogin.btnSecondary} onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
