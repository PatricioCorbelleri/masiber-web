import { colors } from "../tokens/colors";

export const adminLayout = {
  layout: {
    display: "flex",
    height: "100vh",
    background: "#f3f7f8",
  },

  /* ===== SIDEBAR ===== */

  sidebar: {
    width: "270px",
    background: `linear-gradient(180deg, ${colors.petroleoOscuro}, #0f3a3f)`,
    padding: "28px 22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "4px 0 18px rgba(0,0,0,0.18)",
  },

  header: {
    marginBottom: "10px",
  },

  logo: {
    fontFamily: "Montserrat",
    fontSize: "26px",
    fontWeight: "900",
    color: colors.turquesa,
    letterSpacing: "1px",
    marginBottom: "2px",
  },

  subtitle: {
    fontFamily: "Inter",
    fontSize: "13px",
    color: "#b0d7d3",
    marginBottom: "22px",
  },

  /* ===== USER ===== */

  userBox: {
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.1)",
    marginBottom: "28px",
  },

  userLabel: {
    display: "block",
    fontFamily: "Inter",
    fontSize: "11px",
    color: "#b0d7d3",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  userName: {
    fontFamily: "Montserrat",
    fontSize: "15px",
    fontWeight: "700",
    color: "white",
  },

  /* ===== NAV ===== */

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderRadius: "12px",
    textDecoration: "none",
    fontFamily: "Inter",
    fontSize: "15px",
    color: "#e6f2f1",
    transition: "all 0.2s ease",
  },

  linkHover: {
    background: "rgba(255,255,255,0.06)",
  },

  linkActive: {
    background: "rgba(255,255,255,0.12)",
    fontWeight: "600",
  },

  activeIndicator: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: colors.turquesa,
  },

  sectionTitle: {
    fontFamily: "Inter",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#9ed4cd",
    margin: "18px 0 6px",
  },

  /* ===== FOOTER ===== */

  footer: {
    paddingTop: "18px",
    borderTop: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  footerText: {
    fontFamily: "Inter",
    fontSize: "12px",
    color: "#a7cfc9",
    textAlign: "center",
  },

  logoutBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.35)",
    borderRadius: "10px",
    padding: "10px",
    color: "#e6f2f1",
    fontFamily: "Inter",
    fontSize: "14px",
    cursor: "pointer",
  },

  /* ===== MAIN ===== */

  main: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
    background: "#f4f8f9",
  },
};
