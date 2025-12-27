import { useState, useMemo } from "react";
import { mediaCarousel } from "../styles";

export default function MediaCarousel({ images, videos }) {
  // 🔒 NORMALIZACIÓN SEGURA
  const safeImages = Array.isArray(images) ? images : [];
  const safeVideos = Array.isArray(videos) ? videos : [];

  // 🔒 SLIDES LIMPIOS
  const slides = useMemo(() => {
    const imgSlides = safeImages.map((src) => ({
      type: "image",
      src,
    }));

    const videoSlides = safeVideos
      .filter((v) => typeof v === "string" && v.trim() !== "")
      .map((src) => ({
        type: "video",
        src,
      }));

    return [...imgSlides, ...videoSlides];
  }, [safeImages, safeVideos]);

  const [index, setIndex] = useState(0);

  if (slides.length === 0) {
    return (
      <div style={mediaCarousel.placeholder}>
        Sin imágenes disponibles
      </div>
    );
  }

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <div>
      <div style={mediaCarousel.mediaBox}>
        {slide.type === "image" && (
          <img src={slide.src} alt="Producto" style={mediaCarousel.image} />
        )}

        {slide.type === "video" && (
          <iframe
            src={slide.src}
            title="Video producto"
            allowFullScreen
            style={mediaCarousel.video}
          />
        )}

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{ ...mediaCarousel.arrow, left: 12 }}
            >
              ‹
            </button>
            <button
              onClick={next}
              style={{ ...mediaCarousel.arrow, right: 12 }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* DOTS */}
      {slides.length > 1 && (
        <div style={mediaCarousel.dots}>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              style={mediaCarousel.dot(i === index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
