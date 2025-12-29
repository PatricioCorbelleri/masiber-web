import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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

  // Mantiene abierta la rama del acordeón
  const [openPath, setOpenPath] = useState([]);

  /* ===================== CARGAR CATEGORÍAS ===================== */

  useEffect(() => {
    api
      .get("/categories/tree")
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

  const exportToExcel = () => {
    if (!products.length) return;

    const worksheet = XLSX.utils.json_to_sheet(buildExportRows());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "productos_filtrados.xlsx");
  };

  const exportToPDF = () => {
    if (!products.length) return;

    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(14);
    doc.text("Listado de Productos", 14, 15);

    const rows = buildExportRows();

    autoTable(doc, {
  startY: 22,
  head: [Object.keys(rows[0])],
  body: rows.map((r) => Object.values(r)),
  styles: { fontSize: 9 },
  headStyles: { fillColor: [40, 40, 40] },
});


    doc.save("productos_filtrados.pdf");
  };

  /* ===================== CATEGORÍAS (ACORDEÓN) ===================== */

  const renderCategoryAccordion = (nodes, level = 0) => {
    return nodes.map((c) => {
      const isOpen = openPath.includes(c.id);
      const isActive = String(categoryId) === String(c.id);
      const hasChildren = c.children && c.children.length > 0;

      return (
        <div key={c.id} style={{ marginLeft: level * 12 }}>
          <button
            style={{
              ...busqueda.filterBtn,
              ...(isActive ? busqueda.filterBtnActive : {}),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
            }}
            onClick={() => {
              if (hasChildren) {
                setOpenPath((prev) =>
                  prev.includes(c.id)
                    ? prev.slice(0, prev.indexOf(c.id))
                    : [...prev, c.id]
                );
                return;
              }

              setCategoryId(isActive ? "" : String(c.id));
              setPage(1);
            }}
          >
            <span>{c.name}</span>

            {hasChildren && (
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                {isOpen ? "▾" : "▸"}
              </span>
            )}
          </button>

          {isOpen &&
            hasChildren &&
            renderCategoryAccordion(c.children, level + 1)}
        </div>
      );
    });
  };

  /* ===================== RENDER ===================== */

  return (
    <div style={busqueda.wrapper}>
      <aside style={busqueda.sidebar}>
        <h3 style={busqueda.filterTitle}>Filtros</h3>

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Categorías</p>
          {renderCategoryAccordion(categories)}
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

        {/* 🔥 EXPORTACIÓN */}
        {!loading && products.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              Exportar resultados
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <button style={busqueda.btnExport} onClick={exportToExcel}>
                Excel
              </button>
              <button style={busqueda.btnExport} onClick={exportToPDF}>
                PDF
              </button>
            </div>
          </div>
        )}
      </aside>

      <main style={busqueda.results}>
        <h2 style={busqueda.resultsTitle}>
          {loading ? "Buscando…" : `${products.length} resultados`}
        </h2>

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
