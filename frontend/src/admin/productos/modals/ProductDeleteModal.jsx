export default function ProductDeleteModal({
  product,
  onCancel,
  onConfirm,
  loading,
}) {
  if (!product) return null;

  return (
    <div style={backdrop} onMouseDown={onCancel}>
      <div style={card} onMouseDown={(e) => e.stopPropagation()}>
        <h3 style={title}>Eliminar producto</h3>

        <p style={text}>
          ¿Eliminar <b>{product.name}</b>?  
          Esta acción no se puede deshacer.
        </p>

        <div style={actions}>
          <button style={btnGhost} onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button style={btnDanger} onClick={onConfirm} disabled={loading}>
            {loading ? "Eliminando…" : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  maxWidth: "500px",
  width: "90%",
};

const title = {
  fontFamily: "Montserrat",
  fontWeight: 900,
};

const text = {
  fontFamily: "Inter",
  marginTop: "10px",
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
};

const btnGhost = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  background: "#f3f3f3",
  cursor: "pointer",
};

const btnDanger = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#b30000",
  color: "white",
  cursor: "pointer",
};
