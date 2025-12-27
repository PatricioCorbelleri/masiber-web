import { colors } from "../tokens/colors";

export const adminProductForm = {
  title: {
    fontFamily: "Montserrat",
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "20px",
    color: colors.petroleoOscuro,
  },

  card: {
    maxWidth: "720px",
    background: "white",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
  },

  label: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "600",
    color: "#223",
  },

  input: {
    padding: "11px 13px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    fontFamily: "Inter",
  },

  textarea: {
    minHeight: "120px",
    resize: "vertical",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  imgGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  imgBox: {
    position: "relative",
  },

  img: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  btnDeleteImg: {
    position: "absolute",
    bottom: "6px",
    left: "6px",
    background: "#b30000",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },

  btnPrimary: {
    background: colors.verdePetroleo,
    padding: "12px 20px",
    borderRadius: "12px",
    color: "white",
    border: "none",
    fontFamily: "Montserrat",
    fontWeight: "700",
    cursor: "pointer",
  },

  btnCancel: {
    background: "#eee",
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    fontFamily: "Montserrat",
    fontWeight: "600",
    cursor: "pointer",
  },
};
