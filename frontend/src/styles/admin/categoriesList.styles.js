import { colors } from "../tokens/colors";

export const categoriesListStyles = {
  title: {
    fontSize: "26px",
    fontWeight: 900,
    fontFamily: "Montserrat",
    marginBottom: "20px",
  },

  formRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    maxWidth: "420px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Inter",
  },

  btnPrimary: {
    background: colors.verdePetroleo,
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnEdit: {
    background: colors.turquesa,
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnDelete: {
    background: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnCancel: {
    background: "#eee",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    fontFamily: "Montserrat",
    cursor: "pointer",
  },

  card: {
    maxWidth: "620px",
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Inter",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f4f6f8",
    fontWeight: 700,
  },

  thRight: {
    ...this?.th,
    textAlign: "right",
  },

  row: {
    borderBottom: "1px solid #eee",
  },

  cell: {
    padding: "12px",
  },

  actionsCell: {
    padding: "12px",
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },

  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modalBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "300px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px",
  },
};
