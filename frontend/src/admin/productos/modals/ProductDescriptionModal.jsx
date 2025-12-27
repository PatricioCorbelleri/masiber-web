export default function ProductDescriptionModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div style={backdrop} onMouseDown={onClose}>
      <div style={card} onMouseDown={(e) => e.stopPropagation()}>
        <h3 style={title}>{product.name}</h3>
        <p style={text}>
          {product.description || "Sin descripción."}
        </p>
        <button style={btn} onClick={onClose}>
          Cerrar
        </button>
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
  maxWidth: "600px",
  width: "90%",
};

const title = {
  fontFamily: "Montserrat",
  fontWeight: 900,
  marginBottom: "10px",
};

const text = {
  fontFamily: "Inter",
  lineHeight: 1.6,
};

const btn = {
  marginTop: "20px",
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "#1a7f74",
  color: "white",
  cursor: "pointer",
};
