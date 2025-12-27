import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import { page, images, productsGrid } from "../styles";
import ProductCard from "../components/ProductCard"; // Importamos el nuevo ProductCard

const API_URL = "http://127.0.0.1:8000";

const resolveImage = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return API_URL + img;
};

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error cargando productos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={page.wrapper}>
        <h1 style={productsGrid.title}>Productos</h1>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div style={page.wrapper}>
      <div style={productsGrid.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} /> // Usamos el ProductCard para mostrar cada producto
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
