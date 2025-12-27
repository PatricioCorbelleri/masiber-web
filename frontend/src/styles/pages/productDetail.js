import { colors } from "../tokens/colors";

export const productDetail = {
  imagePlaceholder: {
    height: "420px",
    background: "#eef3f4",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.55)",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
  },

  dots: {
    position: "absolute",
    bottom: "12px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: colors.verdePetroleo,
    cursor: "pointer",
  },

  infoCol: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    fontSize: "28px",
    color: colors.petroleoOscuro,
  },

  category: {
    fontFamily: "Inter",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: colors.turquesa,
  },

  priceUSD: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: "18px",
  },

  dollarInfo: {
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#666",
  },

  priceARS: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    fontSize: "22px",
    color: "#008000",
  },

  tags: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontFamily: "Inter",
    background: "#e5f4f1",
    color: colors.petroleoOscuro,
  },

  btnWhats: {
    marginTop: "20px",
    padding: "12px 22px",
    borderRadius: "999px",
    background: colors.verdePetroleo,
    color: "white",
    textDecoration: "none",
    fontFamily: "Montserrat",
    fontWeight: "700",
    width: "fit-content",
  },

  descriptionBlock: {
    marginTop: "40px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 14px 36px rgba(0,0,0,0.06)",
  },

  sectionTitle: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    fontSize: "20px",
    marginBottom: "14px",
  },

  description: {
    fontFamily: "Inter",
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#444",
  },
};
