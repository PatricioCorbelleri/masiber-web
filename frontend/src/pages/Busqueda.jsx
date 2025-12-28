import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { busqueda } from "../styles";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import EmptyState from "../components/EmptyState";

const PAGE_SIZE = 8;

const CONDITIONS = [
  { value: "NUEVO", label: "Nuevo" },
  { value: "CASI_NUEVO", label: "Casi nuevo" },
  { value: "USADO", label: "Usado" },
];

export default function Busqueda() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const qParam = params.get("q") || "";
  const categoryIdParam = params.get("category_id") || "";
  const brandParam = params.get("brand") || "";
  const conditionParam = params.get("condition") || "";
  const pageParam = Number(params.get("page") || 1);

  const [query] = useState(qParam);
  const [categoryId, setCategoryId] = useState(categoryIdParam);
  const [brand, setBrand] = useState(brandParam);
  const [condition, setCondition] = useState(conditionParam);
  const [page, setPage] = useState(pageParam);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ===================== CARGAR CATEGORÍAS ===================== */

  useEffect(() => {
    api
      .get("/products/meta/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  /* ===================== BUSCAR PRODUCTOS ===================== */

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products/search", {
          params: {
            q: query || undefined,
            category_id: categoryId || undefined,
            brand: brand || undefined,
            condition: condition || undefined,
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
  }, [query, categoryId, brand, condition, page]);

  /* ===================== SYNC URL ===================== */

  useEffect(() => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (categoryId) p.set("category_id", categoryId);
    if (brand) p.set("brand", brand);
    if (condition) p.set("condition", condition);
    p.set("page", page);

    window.history.replaceState({}, "", `/busqueda?${p.toString()}`);
  }, [query, categoryId, brand, condition, page]);

  /* ===================== EXPORT HELPERS ===================== */

  const renderCategoryPath = (category) => {
    if (!category) return "";
    if (!category.parent) return category.name;
    return `${category.parent.name} > ${category.name}`;
  };

  const buildExportRows = () =>
    products.map((p) => ({
      Nombre: p.name,
      Marca: p.brand || "",
      Estado: p.condition || "",
      Categoría: renderCategoryPath(p.category),
      "Precio USD": p.price_usd ?? "",
      Stock: p.stock ?? 0,
    }));

  /* ===================== EXPORT EXCEL ===================== */

  const exportToExcel = () => {
    if (!products.length) {
      alert("No hay productos para exportar");
      return;
    }

    const data = buildExportRows();

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "productos_filtrados.xlsx");
  };

  /* ===================== EXPORT PDF ===================== */

  const exportToPDF = () => {
    if (!products.length) {
      alert("No hay productos para exportar");
      return;
    }

    const doc = new jsPDF("l", "mm", "a4");

    doc.setFontSize(14);
    doc.text("Listado de Productos", 14, 15);

    const rows = buildExportRows();

    doc.autoTable({
      startY: 22,
      head: [Object.keys(rows[0])],
      body: rows.map((r) => Object.values(r)),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [40, 40, 40] },
    });

    doc.save("productos_filtrados.pdf");
  };

  /* ===================== RENDER ===================== */

  return (
    <div style={busqueda.wrapper}>
      <aside style={busqueda.sidebar}>
        <h3 style={busqueda.filterTitle}>Filtros</h3>

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Categorías</p>

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

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Estado</p>

          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              style={{
                ...busqueda.tagChip,
                ...(condition === c.value
                  ? busqueda.tagChipActive
                  : {}),
              }}
              onClick={() => {
                setCondition(condition === c.value ? "" : c.value);
                setPage(1);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Marca</p>

          <input
            type="text"
            placeholder="Ej: Agrometal"
            value={brand}
            style={busqueda.input}
            onChange={(e) => {
              setBrand(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </aside>

      <main style={busqueda.results}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={busqueda.resultsTitle}>
            {loading ? "Buscando…" : `${products.length} resultados`}
          </h2>

          {!loading && products.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              <button style={busqueda.btnExport} onClick={exportToExcel}>
                Exportar Excel
              </button>
              <button style={busqueda.btnExport} onClick={exportToPDF}>
                Exportar PDF
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div style={busqueda.grid}>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <EmptyState
            title="No se encontraron productos"
            text="Probá cambiar los filtros o la búsqueda."
          />
        )}

        {!loading && products.length > 0 && (
          <div style={busqueda.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={busqueda.pagination}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                style={{
                  ...busqueda.pageBtn,
                  ...(page === i + 1
                    ? busqueda.pageBtnActive
                    : {}),
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
