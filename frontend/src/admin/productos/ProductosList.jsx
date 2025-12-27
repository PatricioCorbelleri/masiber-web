import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";

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

  const load = async () => {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const clone = async (p) => {
    await api.post(`/products/${p.id}/clone`);
    load();
  };

  const remove = async () => {
    if (!deleteProduct) return;
    setDeleting(true);
    await api.delete(`/products/${deleteProduct.id}`);
    setDeleting(false);
    setDeleteProduct(null);
    load();
  };

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

      <div style={s.card}>
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <ProductsTable
            products={products}
            onViewDescription={setDescProduct}
            onClone={clone}
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
