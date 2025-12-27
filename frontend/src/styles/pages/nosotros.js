import { colors } from "../tokens/colors";

export const nosotros = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f0f8f8, white)",
    padding: "60px 20px",
  },

  heroTitle: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "48px",
    textAlign: "center",
    color: colors.petroleoOscuro,
    letterSpacing: "1px",
    marginBottom: "20px",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.8s ease",
  },

  heroText: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "18px",
    color: colors.grisOscuro,
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.8s ease 0.2s",
  },

  sectionGrid: {
    marginTop: "80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
  },

  box: {
    background: "white",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.8s ease",
  },

  boxTitle: {
    fontFamily: "Montserrat",
    color: colors.petroleoOscuro,
    fontSize: "24px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  boxText: {
    fontFamily: "Inter",
    color: colors.grisOscuro,
    fontSize: "16px",
    lineHeight: "26px",
  },

  sectionTitle: {
    marginTop: "100px",
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "38px",
    textAlign: "center",
    color: colors.petroleoOscuro,
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.8s ease",
  },

  cardsRow: {
    marginTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },

  highlightCard: {
    background: colors.turquesa,
    color: "white",
    padding: "30px 25px",
    borderRadius: "14px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "0.8s ease",
  },

  highlightTitle: {
    fontFamily: "Montserrat",
    fontWeight: "800",
    fontSize: "22px",
    marginBottom: "10px",
  },

  highlightText: {
    fontFamily: "Inter",
    fontSize: "16px",
  },
};
