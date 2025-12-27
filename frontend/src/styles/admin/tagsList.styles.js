import { colors } from "../tokens/colors";

export const tagsListStyles = {
  title: {
    fontSize: "26px",
    fontWeight: "900",
    fontFamily: "Montserrat",
    marginBottom: "20px",
  },

  wrapper: {
  maxWidth: "560px",
  margin: "0 auto",
},

card: {
  background: "white",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
},


  formRow: {
  display: "flex",
  gap: "10px",
  marginBottom: "16px",
},


  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Inter",
  },

  btnPrimary: {
    background: colors.verdePetroleo,
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnEdit: {
    background: colors.turquesa,
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnDelete: {
    background: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    fontFamily: "Montserrat",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnCancel: {
    background: "#eee",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    fontFamily: "Montserrat",
    cursor: "pointer",
  },

 table: {
  width: "100%",
  background: "white",
  borderRadius: "12px",
  borderCollapse: "collapse",
  boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
  overflow: "hidden",
},


th: {
  textAlign: "left",
  padding: "9px 10px",
  background: "#f6f8f9",
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: "12px",
  color: "#556",
},



  row: {
    borderBottom: "1px solid #eee",
  },

cell: {
  padding: "9px 10px",
  fontFamily: "Inter",
  fontSize: "14px",
},



actionsCell: {
  padding: "10px 12px",
  display: "flex",
  gap: "8px",
  justifyContent: "flex-end",
},


  /* ===== MODAL ===== */

  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modalBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "300px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px",
  },
};
