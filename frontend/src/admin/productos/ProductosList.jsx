import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

import ProductsTable from "./ProductsTable";
import ProductDescriptionModal from "./modals/ProductDescriptionModal";
import ProductDeleteModal from "./modals/ProductDeleteModal";
import BulkPreviewModal from "./modals/BulkPreviewModal";
import { productsListStyles as s } from "../../styles/admin/productsList.styles";

export default function ProductosList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [descProduct, setDescProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ===================== FILTROS ===================== */
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  /* ===================== CAMBIO MASIVO ===================== */
  const [bulkField, setBulkField] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [bulkType, setBulkType] = useState("");
  const [bulkValue, setBulkValue] = useState("");

  /* ===================== PREVIEW ===================== */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState({ total: 0, items: [] });

  /* ===================== LOAD ===================== */
  const load = async () => {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  /* ===================== DELETE ===================== */
  const remove = async () => {
    if (!deleteProduct) return;
    setDeleting(true);
    await api.delete(`/products/${deleteProduct.id}`);
    setDeleting(false);
    setDeleteProduct(null);
    load();
  };

  /* ===================== FILTRADO ===================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = brandFilter
        ? String(p.brand?.id) === String(brandFilter)
        : true;

      const matchCategory = categoryFilter
        ? String(p.category?.id) === String(categoryFilter)
        : true;

      return matchBrand && matchCategory;
    });
  }, [products, brandFilter, categoryFilter]);

  /* ===================== OPCIONES ===================== */
  const brands = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.brand) map.set(p.brand.id, p.brand.name);
    });
    return Array.from(map.entries());
  }, [products]);

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.category) map.set(p.category.id, p.category.name);
    });
    return Array.from(map.entries());
  }, [products]);

  /* ===================== PAYLOAD ===================== */
  const buildPayload = () => ({
    field: bulkField,
    action: bulkAction,
    type: bulkType,
    value: Number(bulkValue),
    brand_id: brandFilter ? Number(brandFilter) : null,
    category_id: categoryFilter ? Number(categoryFilter) : null,
  });

  /* ===================== PREVIEW ===================== */
  const aplicarCambioMasivo = async () => {
    if (!bulkField || !bulkAction || !bulkType || !bulkValue) {
      alert("Completá todas las opciones");
      return;
    }

    try {
      setPreviewLoading(true);
      setPreviewOpen(true);

      const res = await api.post(
        "/products/bulk-preview",
        buildPayload()
      );

      setPreviewData(res.data);
    } catch (err) {
      console.error("ERROR PREVIEW:", err);

      if (err.response) {
        alert(
          "ERROR BACKEND:\n" +
          JSON.stringify(err.response.data, null, 2)
        );
      } else {
        alert("ERROR FRONT / RED:\n" + err.message);
      }

      setPreviewOpen(false);
    } finally {
      // 🔴 FIX CLAVE
      setPreviewLoading(false);
    }
  };

  /* ===================== CONFIRMAR ===================== */
  const confirmarCambios = async () => {
    try {
      await api.put("/products/bulk-update", buildPayload());
      setPreviewOpen(false);
      load();
    } catch (err) {
      console.error(err);
      alert("Error al aplicar cambios");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div style={s.headerRow}>
        <div>
          <h1 style={s.title}>Productos</h1>
          <p style={s.subtitle}>Administrá tu catálogo</p>
        </div>

        <Link to="/admin/productos/crear" style={s.btnPrimary}>
          + Nuevo producto
        </Link>
      </div>

      {/* FILTROS */}
      <div style={{ ...s.card, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div>
            <label>Marca</label>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              style={s.input}
            >
              <option value="">Todas</option>
              {brands.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
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
        </div>
      </div>

      {/* CAMBIO MASIVO */}
      <div style={{ ...s.card, marginBottom: 20 }}>
        <h3>Cambio masivo de precios</h3>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <select value={bulkField} onChange={(e) => setBulkField(e.target.value)} style={s.input}>
            <option value="">Qué modificar</option>
            <option value="cost_usd">Costo</option>
            <option value="margin_value">Margen</option>
          </select>

          <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} style={s.input}>
            <option value="">Acción</option>
            <option value="INCREASE">Aumentar</option>
            <option value="DECREASE">Reducir</option>
          </select>

          <select value={bulkType} onChange={(e) => setBulkType(e.target.value)} style={s.input}>
            <option value="">Tipo</option>
            <option value="PERCENT">Porcentaje (%)</option>
            <option value="FIXED">Monto fijo (USD)</option>
          </select>

          <input
            type="number"
            placeholder="Valor"
            value={bulkValue}
            onChange={(e) => setBulkValue(e.target.value)}
            style={s.input}
          />

          <button style={s.btnPrimary} onClick={aplicarCambioMasivo}>
            Previsualizar
          </button>
        </div>
      </div>

      {/* TABLA */}
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

      <BulkPreviewModal
        open={previewOpen}
        loading={previewLoading}
        preview={previewData}
        onCancel={() => setPreviewOpen(false)}
        onConfirm={confirmarCambios}
      />
    </div>
  );
}
