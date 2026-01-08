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

  const renderMargin = (p) => {
    if (p.margin_value == null) return "—";
    if (p.margin_type === "PERCENT") {
      return `${p.margin_value}%`;
    }
    return `USD ${formatUSD(p.margin_value)}`;
  };

  return (
    <table style={s.table}>
      <thead>
        <tr>
          <th style={s.th}>Nombre</th>
          <th style={s.th}>Descripción</th>
          <th style={s.th}>Marca</th>
          <th style={s.th}>Estado</th>
          <th style={s.th}>Costo USD</th>
          <th style={s.th}>Margen</th>
          <th style={s.th}>Precio USD</th>
          <th style={s.th}>Stock</th>
          <th style={s.th}>Categoría</th>
          <th style={{ ...s.th, textAlign: "right" }}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} style={s.tr}>
            {/* NOMBRE */}
            <td style={{ ...s.td, ...s.tdStrong }}>
              {p.name}
            </td>

            {/* DESCRIPCIÓN */}
            <td style={s.td}>
              {p.description ? (
                <button
                  type="button"
                  style={s.btnLink}
                  onClick={() => onViewDescription(p)}
                >
                  Ver descripción
                </button>
              ) : (
                "—"
              )}
            </td>

            {/* MARCA */}
            <td style={s.td}>
              {p.brand?.name || "—"}
            </td>

            {/* ESTADO */}
            <td style={s.td}>
              {renderCondition(p.condition)}
            </td>

            {/* COSTO */}
            <td style={s.td}>
              {p.cost_usd != null
                ? `USD ${formatUSD(p.cost_usd)}`
                : "—"}
            </td>

            {/* MARGEN */}
            <td style={s.td}>
              {renderMargin(p)}
            </td>

            {/* PRECIO FINAL */}
            <td style={s.td}>
              <strong>
                {p.price_usd != null
                  ? `USD ${formatUSD(p.price_usd)}`
                  : "A consultar"}
              </strong>
            </td>

            {/* STOCK */}
            <td style={s.td}>
              {p.stock ?? 0}
            </td>

            {/* CATEGORÍA */}
            <td style={s.td}>
              {renderCategoryPath(p.category)}
            </td>

            {/* ACCIONES */}
            <td style={{ ...s.td, textAlign: "right" }}>
              <div style={s.actionsWrap}>
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
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
