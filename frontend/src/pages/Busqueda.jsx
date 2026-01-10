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

  const [query] = useState(params.get("q") || "");
  const [categoryId, setCategoryId] = useState(params.get("category_id") || "");
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [condition, setCondition] = useState(params.get("condition") || "");
  const [page, setPage] = useState(Number(params.get("page") || 1));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [categoryPath, setCategoryPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  /* ===================== DATA ===================== */

  useEffect(() => {
    api.get("/categories/tree").then((r) => setCategories(r.data || []));
    api.get("/brands").then((r) => setBrands(r.data || []));
  }, []);

  useEffect(() => {
    const fetch = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query, categoryId, brand, condition, page]);

  /* ===================== CATEGORÍAS EN CASCADA ===================== */

  const getLevelOptions = (level) => {
    if (level === 0) return categories;
    const parent = categoryPath[level - 1];
    return parent?.children || [];
  };

  const onSelectCategory = (level, cat) => {
    const newPath = categoryPath.slice(0, level);
    if (cat) newPath[level] = cat;
    setCategoryPath(newPath);
    setCategoryId(cat ? String(cat.id) : "");
    setPage(1);
  };

  /* ===================== LIMPIAR ===================== */

  const clearFilters = () => {
    setBrand("");
    setCondition("");
    setCategoryId("");
    setCategoryPath([]);
    setPage(1);
  };

  /* ===================== RENDER ===================== */

  return (
    <div style={busqueda.wrapper}>
      <aside style={busqueda.sidebar}>
        <h3 style={busqueda.filterTitle}>Filtros</h3>

        {(brand || condition || categoryId) && (
          <button style={busqueda.btnClear} onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Categorías</p>
          {[0, 1, 2].map((level) => {
            const options = getLevelOptions(level);
            if (!options.length) return null;

            return (
              <select
                key={level}
                style={busqueda.select}
                value={categoryPath[level]?.id || ""}
                onChange={(e) => {
                  const cat = options.find(
                    (c) => String(c.id) === e.target.value
                  );
                  onSelectCategory(level, cat || null);
                }}
              >
                <option value="">Seleccionar</option>
                {options.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            );
          })}
        </div>

        <div style={busqueda.filterBlock}>
          <p style={busqueda.filterLabel}>Estado</p>
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              style={{
                ...busqueda.tagChip,
                ...(condition === c.value ? busqueda.tagChipActive : {}),
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
          <select
            style={busqueda.select}
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {!loading && products.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>
              Exportar resultados
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={busqueda.btnExport}>Excel</button>
              <button style={busqueda.btnExport}>PDF</button>
            </div>
          </div>
        )}
      </aside>

      <main>
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
            text="Probá cambiar los filtros."
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
