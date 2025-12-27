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
import UsdSettings from "./admin/UsdSettings";
import TagsList from "./admin/tags/TagsList";
import CategoriesList from "./admin/categories/CategoriesList";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsdProvider>
          <Routes>

            {/* ===================== */}
            {/* LOGIN ADMIN */}
            {/* ===================== */}
            <Route path="/admin/login" element={<Login />} />

            {/* ===================== */}
            {/* ADMIN (PROTEGIDO) */}
            {/* ===================== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="productos" element={<ProductosList />} />
              <Route path="productos/crear" element={<CrearProducto />} />
              <Route path="productos/editar/:id" element={<EditarProducto />} />
              <Route path="dolar" element={<UsdSettings />} />
              <Route path="tags" element={<TagsList />} />
              <Route path="/admin/categories" element={<CategoriesList />} />
            </Route>

            {/* ===================== */}
            {/* SITIO PÚBLICO */}
            {/* ===================== */}

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

            {/* 🔎 BÚSQUEDA */}
            <Route
              path="/Busqueda"
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
