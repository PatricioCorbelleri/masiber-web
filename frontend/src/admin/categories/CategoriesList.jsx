import { useEffect, useState } from "react";
import api from "../../api/axios";
import { categoriesListStyles as s } from "../../styles/admin/categoriesList.styles";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/categories/tree");
    setCategories(res.data || []);
  };

  const renderRows = (nodes, level = 0) => {
    return nodes.flatMap((c) => {
      const rows = [
        <tr key={c.id}>
          <td style={s.cell}>
            {"— ".repeat(level)}
            {c.name}
          </td>
        </tr>,
      ];

      if (c.children && c.children.length > 0) {
        rows.push(...renderRows(c.children, level + 1));
      }

      return rows;
    });
  };

  return (
    <div style={s.wrapper}>
      <h1 style={s.title}>Categorías</h1>

      <table style={s.table}>
        <tbody>{renderRows(categories)}</tbody>
      </table>
    </div>
  );
}
