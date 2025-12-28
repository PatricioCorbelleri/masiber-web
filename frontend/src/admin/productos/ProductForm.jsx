import ImageUploader from "../../components/ImageUploader";
import CategorySelector from "../categories/CategorySelector";
import { adminProductForm as s } from "../../styles";

export default function ProductForm({
  title,
  form,
  onChange,
  categoryId,
  setCategoryId,
  images,
  setImages,
  currentImages = [],
  onDeleteImage,
  onVideoChange,
  onSubmit,
  onCancel,
  submitLabel,
  loading,
}) {
  return (
    <div>
      <h1 style={s.title}>{title}</h1>

      <div style={s.card}>
        {/* NOMBRE */}
        <div style={s.field}>
          <label style={s.label}>Nombre *</label>
          <input
            style={s.input}
            name="name"
            value={form.name}
            onChange={onChange}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div style={s.field}>
          <label style={s.label}>Descripción</label>
          <textarea
            style={{ ...s.input, ...s.textarea }}
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>

        {/* MARCA */}
        <div style={s.field}>
          <label style={s.label}>Marca *</label>
          <input
            style={s.input}
            name="brand"
            value={form.brand}
            onChange={onChange}
            placeholder="Ej: Agrometal"
          />
        </div>

        {/* ESTADO */}
        <div style={s.field}>
          <label style={s.label}>Estado *</label>
          <select
            style={s.input}
            name="condition"
            value={form.condition}
            onChange={onChange}
          >
            <option value="" disabled>
              Seleccionar estado
            </option>
            <option value="NUEVO">Nuevo</option>
            <option value="CASI_NUEVO">Casi nuevo</option>
            <option value="USADO">Usado</option>
          </select>
        </div>

        {/* CATEGORÍA */}
        <div style={s.field}>
          <label style={s.label}>Categoría *</label>
          <CategorySelector
            value={categoryId}
            onChange={setCategoryId}
          />
        </div>

        {/* PRECIO + STOCK */}
        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Precio USD</label>
            <input
              style={s.input}
              type="number"
              name="price_usd"
              value={form.price_usd}
              onChange={onChange}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Stock</label>
            <input
              style={s.input}
              type="number"
              name="stock"
              value={form.stock}
              onChange={onChange}
            />
          </div>
        </div>

        {/* IMÁGENES ACTUALES */}
        {currentImages.length > 0 && (
          <div style={s.field}>
            <label style={s.label}>Imágenes actuales</label>
            <div style={s.imgGrid}>
              {currentImages.map((img) => (
                <div key={img} style={s.imgBox}>
                  <img
                    src={`http://localhost:8000${img}`}
                    alt=""
                    style={s.img}
                  />
                  <button
                    style={s.btnDeleteImg}
                    onClick={() => onDeleteImage(img)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NUEVAS IMÁGENES */}
        <div style={s.field}>
          <label style={s.label}>Imágenes</label>
          <ImageUploader images={images} setImages={setImages} />
        </div>

        {/* VIDEO */}
        <div style={s.field}>
          <label style={s.label}>Video (opcional)</label>
          <input type="file" accept="video/*" onChange={onVideoChange} />
        </div>

        {/* ACCIONES */}
        <div style={s.actions}>
          <button style={s.btnCancel} onClick={onCancel} disabled={loading}>
            Cancelar
          </button>

          <button style={s.btnPrimary} onClick={onSubmit} disabled={loading}>
            {loading ? "Guardando..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
