import { Link } from "react-router-dom";
import { productsListStyles as s } from "../../styles/admin/productsList.styles";
import { formatUSD } from "../../utils/format";

export default function ProductsTable({
  products,
  onViewDescription,
  onDelete,
}) {
  const renderCategoryPath = (category) => {
    if (!category) return "—";
    if (!category.parent) return category.name;
    return `${category.parent.name} > ${category.name}`;
  };

  const renderCondition = (condition) => {
    if (!condition) return "—";
    if (condition === "NUEVO") return "Nuevo";
    if (condition === "CASI_NUEVO") return "Casi nuevo";
    if (condition === "USADO") return "Usado";
    return condition;
  };

  return (
    <table style={s.table}>
      <thead>
        <tr>
          <th style={s.th}>Nombre</th>
          <th style={s.th}>Descripción</th>
          <th style={s.th}>Marca</th>
          <th style={s.th}>Estado</th>
          <th style={s.th}>Precio</th>
          <th style={s.th}>Stock</th>
          <th style={s.th}>Categoría</th>
          <th style={{ ...s.th, textAlign: "right" }}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} style={s.tr}>
            <td style={s.tdStrong}>{p.name}</td>

            <td style={s.td}>
              {p.description?.length > 60 ? (
                <>
                  {p.description.slice(0, 60)}…
                  <button
                    type="button"
                    style={s.btnLink}
                    onClick={() => onViewDescription(p)}
                  >
                    Ver más
                  </button>
                </>
              ) : (
                p.description || "—"
              )}
            </td>

            {/* MARCA */}
            <td style={s.td}>{p.brand || "—"}</td>

            {/* ESTADO */}
            <td style={s.td}>{renderCondition(p.condition)}</td>

            {/* PRECIO */}
            <td style={s.td}>USD {formatUSD(p.price_usd)}</td>

            <td style={s.td}>{p.stock ?? 0}</td>

            {/* CATEGORÍA JERÁRQUICA */}
            <td style={s.td}>
              {renderCategoryPath(p.category)}
            </td>

            <td style={{ ...s.td, textAlign: "right" }}>
              <Link
                to={`/admin/productos/editar/${p.id}`}
                style={s.btnEdit}
              >
                Editar
              </Link>

              <button
                type="button"
                style={s.btnDelete}
                onClick={() => onDelete(p)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
