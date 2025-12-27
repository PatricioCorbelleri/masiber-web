import { colors } from "../tokens/colors";

export const busqueda = {
  wrapper: {
    maxWidth: "1300px",
    margin: "120px auto 60px",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: "30px",
  },

  sidebar: {
    background: "white",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    height: "fit-content",
  },

  filterTitle: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    marginBottom: "16px",
  },

  filterBlock: {
    marginBottom: "20px",
  },

  filterLabel: {
    fontFamily: "Inter",
    fontWeight: 600,
    marginBottom: "8px",
  },

  filterBtn: {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "white",
    marginBottom: "6px",
    cursor: "pointer",
  },

  filterBtnActive: {
    background: colors.verdePetroleo,
    color: "white",
    borderColor: colors.verdePetroleo,
  },

  tagChip: {
    display: "inline-block",
    margin: "4px 6px 4px 0",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontSize: "13px",
  },

  tagChipActive: {
    background: colors.turquesa,
    color: "white",
    borderColor: colors.turquesa,
  },

  resultsTitle: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    marginBottom: "20px",
  },

  empty: {
    fontFamily: "Inter",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "14px",
    padding: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textDecoration: "none",
    color: "#223",
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: 800,
    fontSize: "15px",
  },

  cardCat: {
    fontFamily: "Inter",
    fontSize: "13px",
    color: "#667",
  },

  cardPrice: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    marginTop: "8px",
  },

  pagination: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
  },

  pageBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
  },

  pageBtnActive: {
    background: colors.verdePetroleo,
    color: "white",
    borderColor: colors.verdePetroleo,
  },
};
