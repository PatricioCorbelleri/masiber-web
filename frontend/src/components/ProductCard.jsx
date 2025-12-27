import { useState } from "react";
import { Link } from "react-router-dom";
import { productCard as s } from "../styles";
import { formatUSD } from "../utils/format";

export default function ProductCard({ product }) {
  const images = Array.isArray(product.images) ? product.images : [];
  const tags = Array.isArray(product.tags) ? product.tags : [];
  const stock = Number(product.stock ?? 0);

  const [index, setIndex] = useState(0);
  const image = images[index];

  return (
    <div
      style={s.card}
      onMouseEnter={() =>
        images.length > 1 &&
        setIndex((i) => (i + 1) % images.length)
      }
    >
      {/* IMAGEN */}
      <div style={s.imageBox}>
        {/* BADGE CATEGORÍA */}
        {product.category?.name && (
          <span style={s.categoryBadge}>
            {product.category.name}
          </span>
        )}

        {/* BADGE SIN STOCK */}
        {stock <= 0 && <span style={s.outStockBadge}>Sin stock</span>}

        {image ? (
          <img src={image} alt={product.name} style={s.image} />
        ) : (
          <div style={s.placeholder}>Sin imagen</div>
        )}
      </div>

      {/* BODY */}
      <div style={s.body}>
        <h3 style={s.title}>{product.name}</h3>

       {/* PRECIO */}
{product.price_usd ? (
  <p style={s.priceCentered}>
    USD {formatUSD(product.price_usd)}
  </p>
) : (
  <p style={s.priceAltCentered}>
    Consultar precio
  </p>
)}

        {/* TAGS */}
        {tags.length > 0 && (
          <div style={s.tagsWrap}>
            {tags.map((t, i) => {
              const label =
                typeof t === "string"
                  ? t
                  : t?.name ?? "";

              if (!label) return null;

              return (
                <span key={i} style={s.tag}>
                  #{label}
                </span>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <Link to={`/producto/${product.id}`} style={s.btn}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
