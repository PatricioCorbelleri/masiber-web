import { useEffect } from "react";
import { nosotros, page } from "../styles";

function Nosotros() {
  useEffect(() => {
    const items = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
  }, []);

  return (
    <div style={nosotros.page}>
      <div style={page.wrapper}>
        {/* TÍTULO PRINCIPAL */}
        <h1 className="fade-up" style={nosotros.heroTitle}>
          SOBRE NOSOTROS
        </h1>

        <p className="fade-up" style={nosotros.heroText}>
          Somos MASIBER, una empresa dedicada a impulsar la transformación digital
          del sector agropecuario con tecnología, innovación y soluciones de
          precisión diseñadas para maximizar productividad y eficiencia.
        </p>

        {/* MISIÓN / VISIÓN / VALORES */}
        <div style={nosotros.sectionGrid}>
          <div className="fade-up" style={nosotros.box}>
            <h3 style={nosotros.boxTitle}>Misión</h3>
            <p style={nosotros.boxText}>
              Brindar soluciones tecnológicas confiables y accesibles para
              productores, empresas y distribuidores del sector agropecuario.
            </p>
          </div>

          <div className="fade-up" style={nosotros.box}>
            <h3 style={nosotros.boxTitle}>Visión</h3>
            <p style={nosotros.boxText}>
              Convertirnos en un referente regional en innovación aplicada al
              agro, liderando la adopción de herramientas inteligentes.
            </p>
          </div>

          <div className="fade-up" style={nosotros.box}>
            <h3 style={nosotros.boxTitle}>Valores</h3>
            <p style={nosotros.boxText}>
              Calidad, compromiso, responsabilidad y mejora continua son la base
              de cada producto y servicio que ofrecemos.
            </p>
          </div>
        </div>

        {/* POR QUÉ ELEGIRNOS */}
        <h2 className="fade-up" style={nosotros.sectionTitle}>
          ¿POR QUÉ ELEGIR MASIBER?
        </h2>

        <div style={nosotros.cardsRow}>
          <div className="fade-up" style={nosotros.highlightCard}>
            <h3 style={nosotros.highlightTitle}>Equipos de precisión</h3>
            <p style={nosotros.highlightText}>
              Tecnología moderna para resultados confiables.
            </p>
          </div>

          <div className="fade-up" style={nosotros.highlightCard}>
            <h3 style={nosotros.highlightTitle}>Soporte técnico real</h3>
            <p style={nosotros.highlightText}>
              Acompañamiento directo y profesional.
            </p>
          </div>

          <div className="fade-up" style={nosotros.highlightCard}>
            <h3 style={nosotros.highlightTitle}>Garantía y confianza</h3>
            <p style={nosotros.highlightText}>
              Respaldo total en cada producto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
