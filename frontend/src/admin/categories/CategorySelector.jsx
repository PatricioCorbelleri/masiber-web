import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { categorySelectorStyles as s } from "../../styles/admin/categorySelector.styles";

export default function CategorySelector({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data || []);
  };

  return (
    <select
      style={s.select}
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="" disabled>
        Seleccionar categoría *
      </option>

      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
