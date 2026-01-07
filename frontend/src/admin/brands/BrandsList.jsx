import { useEffect, useState } from "react";
import api from "../../api/axios";
import BrandFormModal from "./BrandFormModal";
import { productsListStyles as s } from "../../styles/admin/productsList.styles";

export default function BrandsList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openForm, setOpenForm] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/brands");
    setBrands(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (brand) => {
    if (!window.confirm(`Eliminar la marca "${brand.name}"?`)) return;
    await api.delete(`/brands/${brand.id}`);
    load();
  };

  return (
    <div>
      <div style={s.headerRow}>
        <div>
          <h1 style={s.title}>Marcas</h1>
          <p style={s.subtitle}>Administrá las marcas del sistema</p>
        </div>

        <button
          style={s.btnPrimary}
          onClick={() => {
            setEditBrand(null);
            setOpenForm(true);
          }}
        >
          + Nueva marca
        </button>
      </div>

      <div style={s.card}>
        {loading ? (
          <p>Cargando…</p>
        ) : brands.length === 0 ? (
          <p>No hay marcas creadas.</p>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Nombre</th>
                <th style={{ ...s.th, textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {brands.map((b) => (
                <tr key={b.id}>
                  <td style={s.tdStrong}>{b.name}</td>
                  <td style={{ ...s.td, textAlign: "right" }}>
                    <button
                      style={s.btnEdit}
                      onClick={() => {
                        setEditBrand(b);
                        setOpenForm(true);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      style={s.btnDelete}
                      onClick={() => remove(b)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openForm && (
        <BrandFormModal
          brand={editBrand}
          onClose={() => setOpenForm(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}
