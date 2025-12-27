import { colors } from "../tokens/colors";

export const bannerCarousel = {
  placeholder: {
    background: colors.fondoClaro,
    padding: "60px 20px",
    textAlign: "center",
    borderRadius: 12,
  },

  placeholderTitle: {
    fontFamily: "Montserrat",
    color: colors.petroleoOscuro,
  },

  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    boxShadow: "0 8px 30px rgba(18,62,67,0.12)",
  },

  slidesWrapper: (count, index) => ({
    display: "flex",
    transition: "transform 700ms cubic-bezier(.22,.9,.3,1)",
    transform: `translateX(-${index * 100}%)`,
    width: `${count * 100}%`,
  }),

  slideItem: (count) => ({
    width: `${100 / count}%`,
    flexShrink: 0,
  }),

  controlButton: (pos) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [pos]: "12px",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    fontSize: "26px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#123e43",
    zIndex: 4,
  }),

  dotsContainer: {
    position: "absolute",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 4,
  },

  dot: (active) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: active
      ? colors.verdePetroleo
      : "rgba(255,255,255,0.45)",
  }),
};
