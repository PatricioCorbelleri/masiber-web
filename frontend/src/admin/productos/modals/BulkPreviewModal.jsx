export default function BulkPreviewModal({
  open,
  loading,
  preview,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          width: "90%",
          maxWidth: 900,
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: 6,
        }}
      >
        <h2>Vista previa del cambio</h2>

        {loading ? (
          <p>Calculando impacto…</p>
        ) : (
          <>
            <p>
              Se modificarán <strong>{preview.total}</strong> productos
            </p>

            <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f3f3" }}>
                  <th align="left">Producto</th>
                  <th align="right">Actual</th>
                  <th align="right">Nuevo</th>
                  <th align="right">Diferencia</th>
                </tr>
              </thead>
              <tbody>
                {preview.items.map((i) => (
                  <tr key={i.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td>{i.name}</td>
                    <td align="right">{i.old_value ?? "—"}</td>
                    <td align="right">{i.new_value ?? "—"}</td>
                    <td
                      align="right"
                      style={{
                        color:
                          i.diff > 0 ? "green" : i.diff < 0 ? "red" : "inherit",
                      }}
                    >
                      {i.diff != null ? i.diff.toFixed(2) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button onClick={onCancel}>Cancelar</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{ background: "#1976d2", color: "#fff" }}
          >
            Confirmar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
