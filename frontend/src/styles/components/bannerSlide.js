import { colors } from "../tokens/colors";

export const bannerSlide = {
  container: {
    height: "420px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "white",
  },

  image: {
    width: "100%",
    height: "420px",
    objectFit: "cover",
    display: "block",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(18,62,67,0.7) 0%, rgba(18,62,67,0.35) 40%, rgba(51,156,140,0.05) 100%)",
    zIndex: 1,
  },

  content: {
    position: "absolute",
    left: "6%",
    zIndex: 2,
    maxWidth: "680px",
    padding: "20px",
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    fontSize: "34px",
    margin: 0,
    color: "white",
    lineHeight: 1.05,
    textShadow: "0 6px 18px rgba(0,0,0,0.25)",
  },

  subtitle: {
    fontFamily: "Inter",
    fontSize: "16px",
    marginTop: "12px",
    color: "#e6f6f3",
    maxWidth: "560px",
  },

  cta: {
    display: "inline-block",
    marginTop: "18px",
    background: colors.verdePetroleo,
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontFamily: "Montserrat",
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(22,128,114,0.25)",
  },
};
