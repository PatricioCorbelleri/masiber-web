import { colors } from "../tokens/colors";

export const imageUploader = {
  dropZone: {
    border: "2px dashed #aaa",
    padding: "22px",
    textAlign: "center",
    borderRadius: "12px",
    cursor: "pointer",
    fontFamily: "Inter",
    fontSize: "14px",
    color: "#444",
    background: "#fafcfc",
  },

  error: {
    marginTop: "8px",
    color: "#b30000",
    fontFamily: "Inter",
    fontSize: "13px",
  },

  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 100px)",
    gap: "10px",
    marginTop: "12px",
  },

  previewImg: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
};
