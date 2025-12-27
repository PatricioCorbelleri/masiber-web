import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { tagsListStyles as s } from "../../styles";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const cargar = async () => {
    const res = await api.get("/tags");
    setTags(res.data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async () => {
    if (!newTag.trim()) return;

    if (editing) {
      await api.put(`/tags/${editing.id}`, { name: newTag });
      setEditing(null);
    } else {
      await api.post("/tags", { name: newTag });
    }

    setNewTag("");
    cargar();
  };

  const eliminar = async () => {
    if (!confirmDelete) return;
    await api.delete(`/tags/${confirmDelete.id}`);
    setConfirmDelete(null);
    cargar();
  };

  return (
    <div style={s.wrapper}>
      <h1 style={s.title}>Tags</h1>

      {/* CREAR / EDITAR */}
      <div style={s.formRow}>
        <input
          style={s.input}
          placeholder="Nombre del tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />

        <button style={s.btnPrimary} onClick={guardar}>
          {editing ? "Guardar" : "Agregar"}
        </button>

        {editing && (
          <button
            style={s.btnCancel}
            onClick={() => {
              setEditing(null);
              setNewTag("");
            }}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* TABLA */}
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Tag</th>
            <th style={s.th} />
          </tr>
        </thead>
        <tbody>
          {tags.map((t) => (
            <tr key={t.id} style={s.row}>
              <td style={s.cell}>{t.name}</td>
              <td style={s.actionsCell}>
                <button
                  style={s.btnEdit}
                  onClick={() => {
                    setEditing(t);
                    setNewTag(t.name);
                  }}
                >
                  Editar
                </button>

                <button
                  style={s.btnDelete}
                  onClick={() => setConfirmDelete(t)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL ELIMINAR */}
      {confirmDelete && (
        <div style={s.modalBg} onClick={() => setConfirmDelete(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <p>
              ¿Eliminar el tag <strong>{confirmDelete.name}</strong>?
            </p>

            <div style={s.modalActions}>
              <button
                style={s.btnCancel}
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button style={s.btnDelete} onClick={eliminar}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
