import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { categoriesListStyles as s } from "../../styles/admin/categoriesList.styles";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!name.trim()) return;

    if (editing) {
      await api.put(`/categories/${editing.id}`, { name });
    } else {
      await api.post("/categories", { name });
    }

    setName("");
    setEditing(null);
    load();
  };

const remove = async (c) => {
  if (!window.confirm(`Eliminar ${c.name}?`)) return;

  try {
    const res = await api.delete(`/categories/${c.id}`);
    console.log("DELETE OK:", res.data);
    load();
  } catch (error) {
    console.error("ERROR AL ELIMINAR:", error);

    if (error.response) {
      // El backend respondió algo (409, 404, etc)
      alert(error.response.data.detail || "No se pudo eliminar la categoría");
    } else {
      // El backend NO respondió (caída / CORS)
      alert("Error de red al eliminar la categoría");
    }
  }
};


  return (
    <div style={s.wrapper}>
      <h1 style={s.title}>Categorías</h1>

      <div style={s.formRow}>
        <input
          style={s.input}
          value={name}
          placeholder="Nombre de categoría"
          onChange={(e) => setName(e.target.value)}
        />

        <button style={s.btnPrimary} onClick={save}>
          {editing ? "Guardar" : "Agregar"}
        </button>
      </div>

      <table style={s.table}>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td style={s.cell}>{c.name}</td>
              <td style={s.actions}>
                <button
                  style={s.btnEdit}
                  onClick={() => {
                    setEditing(c);
                    setName(c.name);
                  }}
                >
                  Editar
                </button>

                <button style={s.btnDelete} onClick={() => remove(c)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
