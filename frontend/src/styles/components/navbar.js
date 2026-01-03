import { colors } from "../tokens/colors";

export const navbar = {
  nav: (visible) => ({
    position: "fixed",
    top: visible ? 0 : "-90px",
    left: 0,
    width: "100%",
    background: `linear-gradient(90deg, ${colors.petroleoOscuro}, #0e2f33)`,
    zIndex: 999,
    boxShadow: "0 4px 16px rgba(0,0,0,0.28)",
    transition: "top 0.35s ease",
  }),

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  logo: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "26px",
    color: colors.turquesa,
    letterSpacing: "1.4px",
  },

  menu: {
    display: "flex",
    gap: "22px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Inter",
    fontSize: "15px",
    opacity: 0.85,
  },

  searchBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  searchInput: {
    width: "100%",
    maxWidth: "380px",
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontFamily: "Inter",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  usdWrapper: {
    minWidth: "120px",
    display: "flex",
    justifyContent: "center",
  },

  usd: {
    color: "white",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 700,
    opacity: 0.9,
    whiteSpace: "nowrap",
  },

  whatsapp: {
    background: "#25D366",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },
};
