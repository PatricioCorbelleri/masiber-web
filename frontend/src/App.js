import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import Busqueda from "./pages/Busqueda";

import { UsdProvider } from "./context/UsdContext";
import { AuthProvider } from "./context/AuthContext";

import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";

import ProductosList from "./admin/productos/ProductosList";
import CrearProducto from "./admin/productos/CrearProducto";
import EditarProducto from "./admin/productos/EditarProducto";

import CategoriesList from "./admin/categories/CategoriesList";
import UsdSettings from "./admin/UsdSettings";

import AdminsList from "./admin/admins/AdminsList";
import CrearAdmin from "./admin/admins/CrearAdmin";
import EditarAdmin from "./admin/admins/EditarAdmin";

import ProtectedRoute from "./components/ProtectedRoute";
import RequireSuperAdmin from "./admin/RequireSuperAdmin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsdProvider>
          <Routes>
            {/* ================= ADMIN LOGIN ================= */}
            <Route path="/admin/login" element={<Login />} />

            {/* ================= ADMIN PANEL (PROTEGIDO) ================= */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />

              {/* PRODUCTOS */}
              <Route path="productos" element={<ProductosList />} />
              <Route path="productos/crear" element={<CrearProducto />} />
              <Route path="productos/editar/:id" element={<EditarProducto />} />

              {/* CATEGORÍAS */}
              <Route path="categories" element={<CategoriesList />} />

              {/* DÓLAR */}
              <Route path="dolar" element={<UsdSettings />} />

              {/* ADMINISTRADORES (SOLO SUPER ADMIN) */}
              <Route
                path="admins"
                element={
                  <RequireSuperAdmin>
                    <AdminsList />
                  </RequireSuperAdmin>
                }
              />

              <Route
                path="admins/crear"
                element={
                  <RequireSuperAdmin>
                    <CrearAdmin />
                  </RequireSuperAdmin>
                }
              />

              <Route
                path="admins/editar/:id"
                element={
                  <RequireSuperAdmin>
                    <EditarAdmin />
                  </RequireSuperAdmin>
                }
              />
            </Route>

            {/* ================= SITIO PÚBLICO ================= */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />

            <Route
              path="/nosotros"
              element={
                <>
                  <Navbar />
                  <Nosotros />
                  <Footer />
                </>
              }
            />

            <Route
              path="/productos"
              element={
                <>
                  <Navbar />
                  <ProductsList />
                  <Footer />
                </>
              }
            />

            <Route
              path="/producto/:id"
              element={
                <>
                  <Navbar />
                  <ProductDetail />
                  <Footer />
                </>
              }
            />

            <Route
              path="/busqueda"
              element={
                <>
                  <Navbar />
                  <Busqueda />
                  <Footer />
                </>
              }
            />
          </Routes>
        </UsdProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
