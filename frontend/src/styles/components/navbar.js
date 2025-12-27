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
    gap: "14px",
  },

  btnPrimary: {
    background: colors.turquesa,
    padding: "8px 18px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    fontFamily: "Montserrat",
    fontWeight: "700",
  },

  btnGhost: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.35)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    fontFamily: "Montserrat",
    cursor: "pointer",
  },

  dropdown: {
    position: "relative",
  },

  dropdownMenu: (open) => ({
    position: "absolute",
    top: "44px",
    right: 0,
    background: "white",
    borderRadius: "12px",
    minWidth: "200px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
    overflow: "hidden",
    transition: "opacity .18s ease, transform .18s ease",
    zIndex: 1000,
    paddingTop: "6px",
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(-8px)",
    pointerEvents: open ? "auto" : "none",
  }),

  dropdownItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#223",
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  dropdownEmpty: {
    display: "block",
    padding: "14px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#777",
  },
};
