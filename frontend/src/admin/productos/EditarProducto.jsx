import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import ProductForm from "./ProductForm";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand_id: "",
    condition: "",
    cost_usd: "",
    margin_type: "",
    margin_value: "",
    price_usd: "",
    stock: 0,
  });

  const [brands, setBrands] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===================== LOAD ===================== */
  useEffect(() => {
    Promise.all([
      api.get("/brands"),
      api.get(`/products/${id}`),
    ])
      .then(([brandsRes, productRes]) => {
        const p = productRes.data;

        setBrands(brandsRes.data || []);

        setForm({
          name: p.name || "",
          description: p.description || "",
          brand_id: p.brand?.id ?? "",
          condition: p.condition || "",
          cost_usd: p.cost_usd ?? "",
          margin_type: p.margin_type ?? "",
          margin_value: p.margin_value ?? "",
          price_usd: p.price_usd ?? "",
          stock: p.stock ?? 0,
        });

        setCategoryId(p.category?.id ?? "");
        setCurrentImages(p.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error al cargar el producto");
        navigate("/admin/productos");
      });
  }, [id, navigate]);

  /* ===================== CHANGE ===================== */
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ===================== IMÁGENES ===================== */
  const borrarImagen = async (img) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;

    await api.delete(`/products/${id}/images`, {
      params: { image_path: img },
    });

    setCurrentImages((prev) => prev.filter((i) => i !== img));
  };

  /* ===================== GUARDAR ===================== */
  const guardar = async () => {
    if (!form.name.trim()) return alert("El nombre es obligatorio");
    if (!form.brand_id) return alert("La marca es obligatoria");
    if (!form.condition) return alert("El estado es obligatorio");
    if (!categoryId) return alert("La categoría es obligatoria");

    try {
      setSaving(true);

      // 1️⃣ Actualizar datos base
      await api.put(`/products/${id}`, {
        name: form.name,
        description: form.description || null,
        brand_id: Number(form.brand_id),
        condition: form.condition,
        cost_usd: form.cost_usd ? Number(form.cost_usd) : null,
        margin_type: form.margin_type || null,
        margin_value: form.margin_value ? Number(form.margin_value) : null,
        price_usd: form.price_usd ? Number(form.price_usd) : null,
        stock: Number(form.stock),
        category_id: Number(categoryId),
      });

      // 2️⃣ Subir nuevas imágenes
      if (newImages.length > 0) {
        const fd = new FormData();
        newImages.forEach((img) => fd.append("files", img));

        const res = await api.post(`/products/${id}/images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setCurrentImages(res.data.images || []);
        setNewImages([]);
      }

      // 3️⃣ Subir / reemplazar video
      if (video) {
        const vd = new FormData();
        vd.append("video", video);

        await api.post(`/products/${id}/video`, vd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/productos");
    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando producto...</p>;

  return (
    <ProductForm
      title="Editar Producto"
      form={form}
      onChange={onChange}
      brands={brands}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      images={newImages}
      setImages={setNewImages}
      currentImages={currentImages}
      onDeleteImage={borrarImagen}
      onVideoChange={(e) => setVideo(e.target.files[0])}
      onSubmit={guardar}
      onCancel={() => navigate(-1)}
      submitLabel="Guardar cambios"
      loading={saving}
    />
  );
}
