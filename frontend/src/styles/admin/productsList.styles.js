import { colors } from "../tokens/colors";

export const productsListStyles = {
  title: {
    fontFamily: "Montserrat",
    fontSize: "28px",
    fontWeight: 900,
    color: colors.petroleoOscuro,
  },

  subtitle: {
    margin: "8px 0 0",
    fontFamily: "Inter",
    color: "#667",
    fontSize: "14px",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "18px",
  },

  card: {
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    padding: "10px",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontFamily: "Inter",
  },

  th: {
    textAlign: "left",
    fontSize: "13px",
    color: "#556",
    fontWeight: 700,
    padding: "14px",
    borderBottom: "1px solid #e8eef0",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eef3f4",
    fontSize: "14px",
    color: "#223",
    verticalAlign: "top",
  },

  tdStrong: {
    fontFamily: "Montserrat",
    fontWeight: 800,
  },

  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },

  tagChip: {
    background: "#e6f4f1",
    color: colors.petroleoOscuro,
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontFamily: "Inter",
    fontWeight: 600,
  },

  btnPrimary: {
    background: colors.verdePetroleo,
    padding: "10px 16px",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnEdit: {
    background: colors.turquesa,
    padding: "8px 12px",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 700,
    textDecoration: "none",
    marginRight: "8px",
  },

  btnClone: {
    background: "#eef3f4",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid #dde6e8",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontWeight: 700,
    marginRight: "8px",
  },

  btnDelete: {
    background: "#b30000",
    padding: "8px 12px",
    borderRadius: "10px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontWeight: 700,
  },
};
