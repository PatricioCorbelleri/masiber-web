import { colors } from "../tokens/colors";

export const productCard = {
  card: {
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform .25s ease, box-shadow .25s ease",
    cursor: "pointer",
  },

  imageBox: {
    position: "relative",
    height: "200px",
    background: "#f2f4f5",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontFamily: "Inter",
    fontSize: "14px",
  },

  categoryBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: colors.petroleoOscuro,
    color: "white",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "999px",
    zIndex: 2,
  },

  outStockBadge: {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#b71c1c",
  color: "white",
  fontFamily: "Montserrat",
  fontSize: "12px",
  fontWeight: 800,
  padding: "6px 12px",
  borderRadius: "999px",
  zIndex: 2,
  textTransform: "uppercase",
},



  body: {
  padding: "12px 16px 16px", // antes 16px
},


  title: {
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "16px",
  color: colors.petroleoOscuro,
  marginBottom: "4px", // antes 6px
  marginTop: "0",
},


priceAltCentered: {
  fontFamily: "Inter",
  fontSize: "18px",
  color: "#000000ff",
  marginBottom: "10px",
},

  priceCentered: {
  fontFamily: "Inter",
  fontWeight: 800,
  fontSize: "18px",
  color: colors.verdePetroleo,
  marginBottom: "10px",
},


  tagsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "14px",
  },

  tag: {
    background: "#e6f4f1",
    color: colors.petroleoOscuro,
    fontSize: "12px",
    fontFamily: "Inter",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "999px",
  },

  btn: {
    display: "block",
    textAlign: "center",
    background: colors.turquesa,
    color: "white",
    padding: "10px",
    borderRadius: "999px",
    textDecoration: "none",
    fontFamily: "Montserrat",
    fontWeight: 700,
    transition: "background .2s ease",
  },
};
