import { colors } from "../tokens/colors";

export const mediaCarousel = {
  mediaBox: {
    position: "relative",
    height: "420px",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#eef3f4",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  video: {
    width: "100%",
    height: "100%",
    border: "none",
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
    marginTop: "12px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },

  dot: (active) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: colors.verdePetroleo,
    opacity: active ? 1 : 0.4,
    cursor: "pointer",
  }),

  placeholder: {
    height: "420px",
    borderRadius: "16px",
    background: "#eef3f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
    fontFamily: "Inter",
    fontSize: "14px",
  },
};
