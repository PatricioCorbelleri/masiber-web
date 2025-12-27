import { colors } from "../tokens/colors";

export const adminUsdSettings = {
  wrapper: {
  maxWidth: "420px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
},


  title: {
    fontFamily: "Montserrat",
    fontSize: "28px",
    fontWeight: "900",
    color: colors.petroleoOscuro,
  },

  card: {
  marginTop: "20px",
  padding: "24px",
  background: "white",
  borderRadius: "16px",
  maxWidth: "420px",
  boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
},


  labelStrong: {
    fontFamily: "Inter",
    fontSize: "18px",
    color: "#223",
  },

  muted: {
    fontFamily: "Inter",
    fontSize: "15px",
    color: "#777",
  },

  mutedSmall: {
    fontFamily: "Inter",
    fontSize: "15px",
    color: "#999",
  },

input: {
  width: "100%",
  height: "48px",                 // 🔑 fija altura real
  padding: "0 16px",              // 🔑 padding horizontal בלבד
  marginTop: "12px",
  borderRadius: "12px",
  border: "1px solid #d6dadd",
  fontFamily: "Inter",
  fontSize: "15px",
  lineHeight: "48px",              // 🔑 centra el texto verticalmente
  boxSizing: "border-box",         // 🔑 CLAVE
  outline: "none",
  background: "#fff",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
},



  button: {
    marginTop: "14px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    background: colors.verdePetroleo,
    color: "white",
    border: "none",
    fontFamily: "Montserrat",
    fontWeight: "700",
    cursor: "pointer",
  },
};
