import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useUsd } from "../context/UsdContext";
import { page, cards, images, productDetail } from "../styles";

const BACKEND_URL = "http://127.0.0.1:8000";

function ProductDetail() {
  const { id } = useParams();
  const { usd, loading: loadingUsd } = useUsd();

  const [product, setProduct] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error producto", err));
  }, [id]);

  /* ===================== HOOKS SIEMPRE ARRIBA ===================== */

  const imagesArr = useMemo(() => {
    if (!product || !Array.isArray(product.images)) return [];
    return product.images.map((img) =>
      img.startsWith("http") ? img : `${BACKEND_URL}/${img}`
    );
  }, [product]);

  /* ===================== HELPERS ===================== */

  const formatARS = (v) =>
    new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  /* ===================== EARLY RETURN ===================== */

  if (!product || loadingUsd || !usd) {
    return (
      <div style={page.wrapperPadded}>
        <p>Cargando producto...</p>
      </div>
    );
  }

  const priceARS =
    product.price_usd && product.price_usd > 0
      ? product.price_usd * usd.usd_to_ars
      : null;

  const next = () => setSlide((s) => (s + 1) % imagesArr.length);
  const prev = () =>
    setSlide((s) => (s - 1 + imagesArr.length) % imagesArr.length);

  return (
    <div style={page.wrapperPadded}>
      {/* ===================== CARD ===================== */}
      <div style={cards.detail}>
        {/* ===== IMAGEN ===== */}
        <div>
          {imagesArr.length > 0 ? (
            <div style={images.detailWrapper}>
              <img
                src={imagesArr[slide]}
                alt={product.name}
                style={images.detailImage}
                loading="lazy"
              />

              {imagesArr.length > 1 && (
                <>
                  <button
                    style={{ ...productDetail.arrow, left: 12 }}
                    onClick={prev}
                  >
                    ‹
                  </button>
                  <button
                    style={{ ...productDetail.arrow, right: 12 }}
                    onClick={next}
                  >
                    ›
                  </button>

                  <div style={productDetail.dots}>
                    {imagesArr.map((_, i) => (
                      <span
                        key={i}
                        style={{
                          ...productDetail.dot,
                          opacity: i === slide ? 1 : 0.4,
                        }}
                        onClick={() => setSlide(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={productDetail.imagePlaceholder}>Sin imágenes</div>
          )}
        </div>

        {/* ===== INFO ===== */}
        <div style={productDetail.infoCol}>
          <h1 style={productDetail.title}>{product.name}</h1>

          {/* 🔥 FIX CATEGORÍA */}
          <p style={productDetail.category}>
            {product.category?.name}
          </p>

          <p style={productDetail.priceUSD}>
            Precio en USD:{" "}
            {product.price_usd
              ? `USD ${formatARS(product.price_usd)}`
              : "A consultar"}
          </p>

          <p style={productDetail.dollarInfo}>
            Cotización utilizada: ARS {formatARS(usd.usd_to_ars)}
          </p>

          {priceARS && (
            <p style={productDetail.priceARS}>
              Precio estimado: ARS {formatARS(priceARS)}
            </p>
          )}

          {/* 🔥 FIX TAGS */}
          {product.tags?.length > 0 && (
            <div style={productDetail.tags}>
              {product.tags.map((t) => (
                <span key={t.id} style={productDetail.tag}>
                  {t.name}
                </span>
              ))}
            </div>
          )}

          <a
            style={productDetail.btnWhats}
            href={`https://wa.me/5492213053829?text=Hola%20MASIBER,%20quiero%20información%20sobre%20${encodeURIComponent(
              product.name
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>

      {/* ===================== DESCRIPCIÓN ===================== */}
      <div style={productDetail.descriptionBlock}>
        <h2 style={productDetail.sectionTitle}>Descripción</h2>
        <p style={productDetail.description}>
          {product.description || "Sin descripción."}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
