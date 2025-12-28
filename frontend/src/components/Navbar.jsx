import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { navbar } from "../styles";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [openCats, setOpenCats] = useState(false);
  const [categories, setCategories] = useState([]);

  const closeTimer = useRef(null);
  const navigate = useNavigate();

  /* ===================== SCROLL ===================== */

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  /* ===================== CATEGORÍAS ===================== */

  useEffect(() => {
    api
      .get("/products/meta/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  /* ===================== SEARCH ===================== */

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/busqueda?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const goCategory = (c) => {
    setOpenCats(false);
    navigate(`/busqueda?category=${encodeURIComponent(c)}`);
  };

  /* ===================== DROPDOWN ===================== */

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenCats(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenCats(false);
    }, 180);
  };

  return (
    <nav style={navbar.nav(visible)}>
      <div style={navbar.container}>
        {/* IZQUIERDA */}
        <div style={navbar.left}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={navbar.logo}>MASIBER</h1>
          </Link>

          <ul style={navbar.menu}>
            <li><Link to="/" style={navbar.link}>Inicio</Link></li>
            <li><Link to="/productos" style={navbar.link}>Productos</Link></li>
            <li><Link to="/nosotros" style={navbar.link}>Nosotros</Link></li>
          </ul>
        </div>

        {/* CENTRO */}
        <form onSubmit={onSearch} style={navbar.searchBox}>
          <input
            style={navbar.searchInput}
            placeholder="Buscar productos, tags o categorías…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* DERECHA */}
        <div style={navbar.right}>
          <div
            style={navbar.dropdown}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
           {/* <button style={navbar.btnGhost} onClick={() => setOpenCats(!openCats)}>
  Categorías
</button>

<div style={navbar.dropdownMenu(openCats)}>
  {categories.length === 0 && (
    <span style={navbar.dropdownEmpty}>Sin categorías</span>
  )}

  {categories.map((c) => (
    <Link
      key={c.id}
      to={`/busqueda?category_id=${c.id}`}
      style={navbar.dropdownItem}
      onClick={() => setOpenCats(false)}
    >
      {c.name}
    </Link>
  ))}
</div> */}

          </div>

          <Link to="/busqueda" style={navbar.btnPrimary}>
            Búsqueda
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
