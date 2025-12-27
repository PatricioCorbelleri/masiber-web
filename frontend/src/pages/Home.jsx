import ProductsList from "./ProductsList";
import BannerCarousel from "../components/BannerCarousel";
import { home } from "../styles";

const demoBanners = [
  {
    id: 1,
    title: "Tecnología para el agro del futuro",
    subtitle: "Equipos de precisión, soporte técnico y garantía.",
    cta_text: "Ver productos",
    cta_url: "/productos",
    image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=1600&q=80",
  },
  {
    id: 2,
    title: "Financiación y entrega a todo el país",
    subtitle: "Opciones flexibles y servicio técnico especializado.",
    cta_text: "Contactanos",
    cta_url: "https://wa.me/5491112345678?text=Hola%20MASIBER%20quiero%20info",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1600&q=80",
  },
  {
    id: 3,
    title: "Nuevas pulverizadoras 2025",
    subtitle: "Eficiencia y menor consumo con la tecnología MASIBER.",
    cta_text: "Más detalles",
    cta_url: "/productos/3",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
  },
];

function Home() {
  return (
    <div style={home.page}>
      <BannerCarousel
        banners={demoBanners}
        autoplayInterval={6000}
        fetchFromApi={false}
      />

      {/* HERO */}
      <section style={home.heroSection}>
        <div style={home.heroInner}>
          <h1 style={home.heroTitle}>
            TECNOLOGÍA PARA EL AGRO DEL FUTURO
          </h1>

          <p style={home.heroSubtitle}>
            Equipamiento agrícola, insumos y soluciones integrales.
          </p>

          <button style={home.heroButton}>
            Ver productos
          </button>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section style={home.section}>
        <div style={home.sectionInner}>
          <h2 style={home.sectionTitle}>
            Productos destacados
          </h2>

          <ProductsList limit={6} />
        </div>
      </section>
    </div>
  );
}

export default Home;
