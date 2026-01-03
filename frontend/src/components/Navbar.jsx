import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { navbar } from "../styles";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [usd, setUsd] = useState(null);

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

  /* ===================== USD ===================== */

  useEffect(() => {
    api
      .get("/settings/usd")
      .then((res) => {
        // Asegúrate de obtener el número correcto
        if (res.data && typeof res.data === "object" && res.data.usd_to_ars) {
          setUsd(res.data.usd_to_ars);
        } else {
          setUsd(res.data);
        }
      })
      .catch(() => setUsd(null));
  }, []);

  /* ===================== SEARCH ===================== */

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      navigate("/busqueda");
      return;
    }
    navigate(`/busqueda?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  // Formatea el valor del dólar
  const usdLabel =
    usd === null
      ? "USD —"
      : `USD ${usd.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <nav style={navbar.nav(visible)}>
      <div style={navbar.container}>
        {/* IZQUIERDA */}
        <div style={navbar.left}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={navbar.logo}>MASIBER</h1>
          </Link>

          <ul style={navbar.menu}>
            <li>
              <Link to="/" style={navbar.link}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/busqueda" style={navbar.link}>
                Productos
              </Link>
            </li>
            <li>
              <Link to="/nosotros" style={navbar.link}>
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* CENTRO */}
        <form onSubmit={onSearch} style={navbar.searchBox}>
          <input
            style={navbar.searchInput}
            placeholder="Buscar productos, marcas o categorías…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* DERECHA */}
        <div style={navbar.right}>
          {/* USD SIEMPRE VISIBLE */}
          <div style={navbar.usdWrapper}>
            <div style={navbar.usd}>{usdLabel}</div>
          </div>

          {/* WHATSAPP ICON */}
          <a
            href="https://wa.me/5492213053829"
            target="_blank"
            rel="noopener noreferrer"
            style={navbar.whatsapp}
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.38 0 0 5.38 0 12c0 2.12.55 4.18 1.6 6.02L0 24l6.18-1.6A11.93 11.93 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.82c-1.94 0-3.84-.52-5.5-1.52l-.4-.24-3.66.95.98-3.56-.26-.42A9.77 9.77 0 012.18 12C2.18 6.58 6.58 2.18 12 2.18c2.62 0 5.08 1.02 6.93 2.87A9.74 9.74 0 0121.82 12c0 5.42-4.4 9.82-9.82 9.82zm5.48-7.34c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.1 4.48.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;