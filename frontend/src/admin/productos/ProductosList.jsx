import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

import ProductsTable from "./ProductsTable";
import ProductDescriptionModal from "./modals/ProductDescriptionModal";
import ProductDeleteModal from "./modals/ProductDeleteModal";
import { productsListStyles as s } from "../../styles/admin/productsList.styles";

export default function ProductosList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [descProduct, setDescProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 🔎 FILTROS
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async () => {
    if (!deleteProduct) return;
    setDeleting(true);
    await api.delete(`/products/${deleteProduct.id}`);
    setDeleting(false);
    setDeleteProduct(null);
    load();
  };

  // ✅ PRODUCTOS FILTRADOS
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = brandFilter
        ? p.brand?.name
            ?.toLowerCase()
            .includes(brandFilter.toLowerCase())
        : true;

      const matchCategory = categoryFilter
        ? String(p.category?.id) === String(categoryFilter)
        : true;

      return matchBrand && matchCategory;
    });
  }, [products, brandFilter, categoryFilter]);

  // categorías únicas para el select
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.category) {
        map.set(p.category.id, p.category.name);
      }
    });
    return Array.from(map.entries());
  }, [products]);

  return (
    <div>
      <div style={s.headerRow}>
        <div>
          <h1 style={s.title}>Productos</h1>
          <p style={s.subtitle}>Administrá tu catálogo</p>
        </div>

        <Link to="/admin/productos/crear" style={s.btnPrimary}>
          + Nuevo producto
        </Link>
      </div>

      {/* 🔎 FILTROS */}
      <div style={{ ...s.card, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div>
            <label>Marca</label>
            <input
              type="text"
              placeholder="Buscar por marca"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              style={s.input}
            />
          </div>

          <div>
            <label>Categoría</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={s.input}
            >
              <option value="">Todas</option>
              {categories.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {(brandFilter || categoryFilter) && (
            <button
              style={s.btnCancel}
              onClick={() => {
                setBrandFilter("");
                setCategoryFilter("");
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div style={s.card}>
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <ProductsTable
            products={filteredProducts}
            onViewDescription={setDescProduct}
            onDelete={setDeleteProduct}
          />
        )}
      </div>

      <ProductDescriptionModal
        product={descProduct}
        onClose={() => setDescProduct(null)}
      />

      <ProductDeleteModal
        product={deleteProduct}
        loading={deleting}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={remove}
      />
    </div>
  );
}
