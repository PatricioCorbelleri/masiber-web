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

  const getCategorySortKey = (p) => {
    if (!p.category) return "";
    if (!p.category.parent) return p.category.name;
    return `${p.category.parent.name} - ${p.category.name}`;
  };

  const buildExportRows = () =>
    [...products]
      .sort((a, b) =>
        getCategorySortKey(a).localeCompare(getCategorySortKey(b))
      )
      .map((p) => ({
        Producto: p.name,
        Marca: p.brand || "",
        Estado: p.condition || "",
        Precio: p.price_usd ? `USD ${p.price_usd}` : "Consultar",
      }));

  const getFiltersDescription = () => {
    const parts = [];

    if (categoryId) {
      const findCategory = (nodes) => {
        for (const c of nodes) {
          if (String(c.id) === String(categoryId)) return c;
          if (c.children) {
            const found = findCategory(c.children);
            if (found) return found;
          }
        }
        return null;
      };

      const cat = findCategory(categories);
      if (cat) {
        if (cat.parent) {
          parts.push(`Categoría: ${cat.parent.name} > ${cat.name}`);
        } else {
          parts.push(`Categoría: ${cat.name}`);
        }
      }
    }

    if (condition) {
      const label =
        CONDITIONS.find((c) => c.value === condition)?.label || condition;
      parts.push(`Estado: ${label}`);
    }

    if (brand) {
      parts.push(`Marca: ${brand}`);
    }

    return parts.length
      ? `Filtrado por: ${parts.join(" · ")}`
      : "Listado completo de productos";
  };

  /* ===================== LIMPIAR FILTROS ===================== */

  const clearFilters = () => {
    setCategoryId("");
    setCondition("");
    setBrand("");
    setPage(1);
    setOpenPath([]);
  };

  /* ===================== EXCEL ===================== */

  const exportToExcel = () => {
    if (!products.length) return;

    const worksheet = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [[getFiltersDescription()]],
      { origin: "A1" }
    );

    XLSX.utils.sheet_add_json(
      worksheet,
      buildExportRows(),
      { origin: "A3" }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "MASIBER_productos.xlsx");
  };

  /* ===================== PDF ===================== */

  const exportToPDF = () => {
    if (!products.length) return;

    const doc = new jsPDF("p", "mm", "a4");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("MASIBER", 14, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(getFiltersDescription(), 14, 26);

    autoTable(doc, {
      startY: 32,
      head: [Object.keys(buildExportRows()[0])],
      body: buildExportRows().map((r) => Object.values(r)),
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: {
        fillColor: [20, 70, 75],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 248, 249] },
    });

    doc.save("MASIBER_productos.pdf");
  };

  /* ===================== CATEGORÍAS (ACORDEÓN) ===================== */

  const renderCategoryAccordion = (nodes, level = 0) =>
    nodes.map((c) => {
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
            {hasChildren && <span>{isOpen ? "▾" : "▸"}</span>}
          </button>

          {isOpen &&
            hasChildren &&
            renderCategoryAccordion(c.children, level + 1)}
        </div>
      );
    });

  /* ===================== RENDER ===================== */

  return (
    <div style={busqueda.wrapper}>
      <aside style={busqueda.sidebar}>
        <h3 style={busqueda.filterTitle}>Filtros</h3>
        {(categoryId || condition || brand) && (
          <div style={{ marginTop: 14 }}>
            <button
              type="button"
              style={busqueda.btnClear}
              onClick={clearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        )}

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
            style={busqueda.input}
            placeholder="Ej: Agrometal"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {!loading && products.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>
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
      </main>
    </div>
  );
}
