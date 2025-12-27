import { adminDashboard } from "../styles";

export default function Dashboard() {
  return (
    <div style={adminDashboard.wrapper}>
      <h1 style={adminDashboard.title}>
        Bienvenido al Panel de Administración
      </h1>

      <p style={adminDashboard.subtitle}>
        Desde aquí podés administrar productos, actualizar el valor del dólar
        y gestionar tags.
      </p>
    </div>
  );
}
