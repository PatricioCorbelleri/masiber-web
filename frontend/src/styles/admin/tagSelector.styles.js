import { colors } from "../tokens/colors";

export const tagSelectorStyles = {
  wrapper: {
    position: "relative",
  },

  selectedBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff",
  },

  tag: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#e5f4f1",
    color: colors.petroleoOscuro,
    fontSize: "13px",
    fontFamily: "Inter",
    fontWeight: 600,
  },

  removeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: 1,
    color: "#333",
  },

  input: {
    flex: 1,
    minWidth: "120px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontFamily: "Inter",
    padding: "4px",
  },

  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "4px",
    maxHeight: "160px",
    overflowY: "auto",
    zIndex: 20,
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
  },

  option: {
    padding: "10px",
    cursor: "pointer",
    fontFamily: "Inter",
    fontSize: "14px",
  },

  optionHover: {
    background: "#f3f7f8",
  },
};
