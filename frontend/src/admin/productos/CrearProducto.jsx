import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ProductForm from "./ProductForm";

export default function CrearProducto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand_id: "",
    condition: "",
    price_usd: "",
    stock: 0,
  });

  const [brands, setBrands] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===================== MARCAS ===================== */

  useEffect(() => {
    api
      .get("/brands")
      .then((res) => setBrands(res.data || []))
      .catch(() => setBrands([]));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const guardar = async () => {
    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (!form.brand_id) {
      alert("La marca es obligatoria");
      return;
    }

    if (!form.condition) {
      alert("El estado es obligatorio");
      return;
    }

    if (!categoryId) {
      alert("La categoría es obligatoria");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Crear producto base
      const res = await api.post("/products", {
        name: form.name,
        description: form.description,
        brand_id: Number(form.brand_id),
        condition: form.condition,
        price_usd: form.price_usd ? Number(form.price_usd) : null,
        stock: Number(form.stock),
        category_id: Number(categoryId),
      });

      const productId = res.data.id;

      // 2️⃣ Subir imágenes
      if (images.length > 0) {
        const fd = new FormData();
        images.forEach((img) => fd.append("files", img));

        await api.post(`/products/${productId}/images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3️⃣ Subir video
      if (video) {
        const vd = new FormData();
        vd.append("video", video);

        await api.post(`/products/${productId}/video`, vd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/productos");
    } catch (err) {
      console.error("ERROR BACKEND:", err.response?.data || err);
      alert("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      title="Crear Producto"
      form={form}
      onChange={onChange}
      brands={brands}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      images={images}
      setImages={setImages}
      onVideoChange={(e) => setVideo(e.target.files[0])}
      onSubmit={guardar}
      onCancel={() => navigate(-1)}
      submitLabel="Guardar"
      loading={loading}
    />
  );
}
