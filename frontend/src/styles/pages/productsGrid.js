import { colors } from "../tokens/colors";

export const productsGrid = {
  title: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "32px",
    color: colors.petroleoOscuro,
    marginBottom: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },

  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "18px",
    color: colors.petroleoOscuro,
  },

  cardDesc: {
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#555",
    minHeight: "48px",
  },

  footer: {
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: "15px",
    color: colors.verdePetroleo,
  },

  btnVer: {
    textDecoration: "none",
    background: colors.turquesa,
    color: "white",
    padding: "8px 14px",
    borderRadius: "999px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "600",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#777",
  },
};
