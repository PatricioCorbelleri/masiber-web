import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api/axios";
import { busqueda } from "../styles";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import EmptyState from "../components/EmptyState";

const PAGE_SIZE = 8;

export default function Busqueda() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const qParam = params.get("q") || "";
  const tagParam = params.get("tag") || "";
  const categoryIdParam = params.get("category_id") || "";
  const pageParam = Number(params.get("page") || 1);

  // filtros
  const [query] = useState(qParam);
  const [tag, setTag] = useState(tagParam);
  const [categoryId, setCategoryId] = useState(categoryIdParam);
  const [page, setPage] = useState(pageParam);

  // data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ===================== CARGAR CATEGORÍAS Y TAGS ===================== */

  useEffect(() => {
    api
      .get("/products/meta/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));

    api
      .get("/products/meta/tags")
      .then((res) => setTags(res.data || []))
      .catch(() => setTags([]));
  }, []);

  /* ===================== BUSCAR PRODUCTOS ===================== */

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products/search", {
          params: {
            q: query || undefined,
            tag: tag || undefined,
            category_id: categoryId || undefined,
            page,
            limit: PAGE_SIZE,
          },
        });

        setProducts(res.data.items || []);
        setTotalPages(res.data.pages || 1);
      } catch (err) {
        console.error("Error buscando productos", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, tag, categoryId, page]);

  /* ===================== SYNC URL ===================== */

  useEffect(() => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (categoryId) p.set("category_id", categoryId);
    if (tag) p.set("tag", tag);
    p.set("page", page);

    window.history.replaceState({}, "", `/busqueda?${p.toString()}`);
  }, [query, categoryId, tag, page]);

  /* ===================== RENDER ===================== */

  return (
    <div style={busqueda.wrapper}>
      {/* ===================== SIDEBAR ===================== */}
      <aside style={busqueda.sidebar}>
        <h3 style={busqueda.filterTitle}>Filtros</h3>

        {/* ===== CATEGORÍAS ===== */}
        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Categorías</p>

          {categories.length === 0 && (
            <p style={busqueda.empty}>Sin categorías</p>
          )}

          {categories.map((c) => (
            <button
              key={c.id}
              style={{
                ...busqueda.filterBtn,
                ...(String(categoryId) === String(c.id)
                  ? busqueda.filterBtnActive
                  : {}),
              }}
              onClick={() => {
                setCategoryId(
                  String(categoryId) === String(c.id) ? "" : String(c.id)
                );
                setPage(1);
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* ===== TAGS ===== */}
        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Tags</p>

          {tags.length === 0 && (
            <p style={busqueda.empty}>Sin tags</p>
          )}

         {tags.map((t, i) => {
  const tagName = typeof t === "string" ? t : t.name;

  return (
    <button
      key={typeof t === "string" ? t : t.id || i}
      style={{
        ...busqueda.tagChip,
        ...(tag === tagName ? busqueda.tagChipActive : {}),
      }}
      onClick={() => {
        setTag(tag === tagName ? "" : tagName);
        setPage(1);
      }}
    >
      #{tagName}
    </button>
  );
})}


        </div>
      </aside>

      {/* ===================== RESULTADOS ===================== */}
      <main style={busqueda.results}>
        <h2 style={busqueda.resultsTitle}>
          {loading ? "Buscando…" : `${products.length} resultados`}
        </h2>

        {/* ===== SKELETONS ===== */}
        {loading && (
          <div style={busqueda.grid}>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {!loading && products.length === 0 && (
          <EmptyState
            title="No se encontraron productos"
            text="Probá cambiar los filtros o la búsqueda."
          />
        )}

        {/* ===== RESULTADOS ===== */}
        {!loading && products.length > 0 && (
          <div style={busqueda.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* ===== PAGINACIÓN ===== */}
        {totalPages > 1 && (
          <div style={busqueda.pagination}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                style={{
                  ...busqueda.pageBtn,
                  ...(page === i + 1 ? busqueda.pageBtnActive : {}),
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
