import { footer } from "../styles";

function Footer() {
  return (
    <footer style={footer.container}>
      <div style={footer.inner}>
        {/* LOGO + DESCRIPCIÓN */}
        <div style={footer.brand}>
          <h2 style={footer.logo}>MASIBER</h2>
          <p style={footer.tagline}>
            Tecnología, innovación y soluciones integrales para el agro del futuro.
          </p>
        </div>

        {/* CONTACTO */}
        <div style={footer.contact}>
          <a
            href="mailto:contacto@masiber.com"
            style={footer.mail}
            aria-label="Enviar email"
          >
            📧 contacto@masiber.com
          </a>

          <a
            href="https://wa.me/5492213053829?text=Hola%20MASIBER"
            style={footer.whatsappBtn}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
          >
            💬
          </a>
        </div>
      </div>

      <div style={footer.divider} />

      <p style={footer.copyright}>
        © {new Date().getFullYear()} MASIBER • Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
