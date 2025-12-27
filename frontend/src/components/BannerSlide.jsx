import React from "react";
import { bannerSlide } from "../styles";

/**
 * BannerSlide: muestra una imagen con overlay y texto.
 * Banner object expected:
 *  { id, title, subtitle, cta_text, cta_url, image }
 */
export default function BannerSlide({ banner }) {
  const { title, subtitle, cta_text, cta_url, image } = banner;

  return (
    <div style={bannerSlide.container}>
      {/* Imagen */}
      <img
        src={image || "https://picsum.photos/1400/420"}
        alt={title || "Promoción MASIBER"}
        loading="lazy"
        style={bannerSlide.image}
      />

      {/* Overlay */}
      <div aria-hidden="true" style={bannerSlide.overlay} />

      {/* Contenido */}
      <div style={bannerSlide.content}>
        <h2 style={bannerSlide.title}>{title}</h2>

        {subtitle && (
          <p style={bannerSlide.subtitle}>{subtitle}</p>
        )}

        {cta_text && (
          <a
            href={cta_url || "#"}
            style={bannerSlide.cta}
            aria-label={cta_text}
          >
            {cta_text}
          </a>
        )}
      </div>
    </div>
  );
}
