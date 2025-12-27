import { colors } from "../tokens/colors";

export const footer = {
  container: {
    background: colors.grisOscuro,
    color: "white",
    padding: "26px 20px 18px",
    marginTop: "80px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  inner: {
    maxWidth: "1150px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    maxWidth: "320px",
  },

  logo: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "20px",
    color: colors.turquesa,
    letterSpacing: "0.6px",
    margin: 0,
  },

  tagline: {
    fontFamily: "Inter",
    fontSize: "13px",
    opacity: 0.75,
    lineHeight: 1.5,
  },

  contact: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  mail: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "white",
    opacity: 0.8,
    textDecoration: "none",
  },

  whatsappBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: colors.verdePetroleo,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    textDecoration: "none",
    boxShadow: "0 8px 18px rgba(22,128,114,0.35)",
  },

  divider: {
    marginTop: "18px",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },

  copyright: {
    textAlign: "center",
    fontSize: "12px",
    opacity: 0.55,
    fontFamily: "Inter",
    letterSpacing: "0.3px",
    marginTop: "12px",
  },
};
