import { colors } from "../tokens/colors";

export const adminLogin = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "24px",
    background: `linear-gradient(135deg, ${colors.petroleoOscuro}, ${colors.verdePetroleo})`,
  },

  card: {
    width: "420px",
    maxWidth: "100%",
    padding: "36px",
    borderRadius: "14px",
    background: "#ffffff",
    boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "26px",
    marginBottom: "6px",
    textAlign: "center",
    color: colors.petroleoOscuro,
  },

  subtitle: {
    fontFamily: "Inter",
    color: "#444",
    textAlign: "center",
    marginBottom: "22px",
  },

  input: {
    display: "block",
    width: "100%",
    padding: "12px 14px",
    marginBottom: "18px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #d0d0d0",
    outline: "none",
    background: "#fff",
    color: "#111",
    boxSizing: "border-box",
  },

  passwordWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "18px",
    boxSizing: "border-box",
  },

  eyeButton: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    padding: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "6px",
  },

  buttonRow: {
    display: "flex",
    marginTop: "6px",
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },

  btnPrimary: {
    flex: 1,
    padding: "12px 14px",
    background: colors.turquesa,
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  btnSecondary: {
    flex: 1,
    padding: "12px 14px",
    background: "#f1f1f1",
    border: "1px solid #ddd",
    borderRadius: "10px",
    color: "#222",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  globalStyles: `
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { height: 100%; margin: 0; padding: 0; }
    input { font-family: Inter, sans-serif; }
    button:focus { outline: none; }
  `,
};
