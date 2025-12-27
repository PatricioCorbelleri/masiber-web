import { colors } from "../tokens/colors";

export const adminDashboard = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: "32px",
    color: colors.petroleoOscuro,
  },

  subtitle: {
    fontFamily: "Inter",
    fontSize: "18px",
    color: "#555",
    maxWidth: "720px",
    lineHeight: 1.5,
  },
};
