import { useEffect, useState } from "react";
import api from "../../api/axios";
import { categorySelectorStyles as s } from "../../styles/admin/categorySelector.styles";

export default function CategorySelector({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/categories/tree");
    setCategories(res.data || []);
  };

  // Render recursivo de opciones
  const renderOptions = (nodes, level = 0) => {
    return nodes.flatMap((node) => {
      const isLeaf = !node.children || node.children.length === 0;

      const options = [
        <option
          key={node.id}
          value={node.id}
          disabled={!isLeaf}
        >
          {"— ".repeat(level)}
          {node.name}
          {!isLeaf ? " (grupo)" : ""}
        </option>,
      ];

      if (node.children && node.children.length > 0) {
        options.push(...renderOptions(node.children, level + 1));
      }

      return options;
    });
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

      {renderOptions(categories)}
    </select>
  );
}
