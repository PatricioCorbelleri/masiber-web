import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminLayout } from "../styles";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const cerrarSesion = () => {
    const ok = window.confirm("¿Querés cerrar sesión?");
    if (!ok) return;

    logout();
    navigate("/admin/login");
  };

  return (
    <div style={adminLayout.layout}>
      {/* SIDEBAR */}
      <aside style={adminLayout.sidebar}>
        <div>
          <div style={adminLayout.header}>
            <h2 style={adminLayout.logo}>MASIBER</h2>
            <p style={adminLayout.subtitle}>Panel de administración</p>
          </div>

          {user && (
            <div style={adminLayout.userBox}>
              <span style={adminLayout.userLabel}>Usuario</span>
              <span style={adminLayout.userName}>{user.username}</span>
            </div>
          )}

          <nav style={adminLayout.nav}>
            <span style={adminLayout.sectionTitle}>General</span>

            <SidebarLink
              to="/admin"
              label="Dashboard"
              active={isActive("/admin")}
            />

            <SidebarLink
              to="/admin/productos"
              label="Productos"
              active={isActive("/admin/productos")}
            />

            <SidebarLink
  to="/admin/categories"
  label="Categorías"
  active={isActive("/admin/categories")}
/>


            <SidebarLink
              to="/admin/tags"
              label="Tags"
              active={isActive("/admin/tags")}
            />

            <SidebarLink
              to="/admin/dolar"
              label="Dólar"
              active={isActive("/admin/dolar")}
            />

            {/* <span style={adminLayout.sectionTitle}>Sistema</span>

            <SidebarLink
              to="/admin/usuarios/crear"
              label="Crear usuario"
              active={isActive("/admin/usuarios")}
            />

            <SidebarLink
              to="/admin/historial"
              label="Historial"
              active={isActive("/admin/historial")}
            /> */}
          </nav>
        </div>

        <div style={adminLayout.footer}>
          <button style={adminLayout.logoutBtn} onClick={cerrarSesion}>
            Cerrar sesión
          </button>

          <span style={adminLayout.footerText}>
            MASIBER © {new Date().getFullYear()}
          </span>
        </div>
      </aside>

      {/* MAIN */}
      <main style={adminLayout.main}>
        <Outlet />
      </main>
    </div>
  );
}

/* ===== LINK ===== */

function SidebarLink({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        ...adminLayout.link,
        ...(active ? adminLayout.linkActive : {}),
      }}
    >
      <span>{label}</span>
      {active && <span style={adminLayout.activeIndicator} />}
    </Link>
  );
}
