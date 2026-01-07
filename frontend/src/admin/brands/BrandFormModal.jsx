import { useState } from "react";
import api from "../../api/axios";
import { productsListStyles as s } from "../../styles/admin/productsList.styles";

export default function BrandFormModal({ brand, onClose, onSaved }) {
  const [name, setName] = useState(brand?.name || "");
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(brand);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);

    if (isEdit) {
      await api.put(`/brands/${brand.id}`, { name });
    } else {
      await api.post("/brands", { name });
    }

    setSaving(false);
    onSaved();
    onClose();
  };

  return (
    <div style={modal.backdrop}>
      <div style={modal.box}>
        <h2 style={{ marginBottom: 12 }}>
          {isEdit ? "Editar marca" : "Nueva marca"}
        </h2>

        <form onSubmit={submit}>
          <label>Nombre</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={s.input}
            placeholder="Ej: John Deere"
          />

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              type="submit"
              style={s.btnPrimary}
              disabled={saving}
            >
              Guardar
            </button>

            <button
              type="button"
              style={s.btnCancel}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modal = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  box: {
    background: "white",
    borderRadius: 14,
    padding: 20,
    width: 360,
  },
};
