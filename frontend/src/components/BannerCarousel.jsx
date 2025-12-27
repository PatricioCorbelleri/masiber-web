import React, { useEffect, useState, useRef } from "react";
import BannerSlide from "./BannerSlide";
import { bannerCarousel } from "../styles";

/**
 * BannerCarousel
 * Props:
 *  - banners: array de objetos { id, title, subtitle, cta_text, cta_url, image }
 *  - autoplayInterval: ms (default 6000)
 *  - fetchFromApi: boolean (si true intenta GET /banners)
 */
export default function BannerCarousel({
  banners: initialBanners = [],
  autoplayInterval = 6000,
  fetchFromApi = false,
}) {
  const [banners, setBanners] = useState(initialBanners);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!fetchFromApi) return;

    const fetchBanners = async () => {
      try {
        const res = await fetch("http://localhost:8000/banners");
        if (!res.ok) throw new Error("No se pudieron cargar banners");
        const data = await res.json();
        setBanners(data);
      } catch (err) {
        console.warn("BannerCarousel: error cargando banners:", err);
      }
    };

    fetchBanners();
  }, [fetchFromApi]);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, autoplayInterval);

    return () => clearInterval(timerRef.current);
  }, [isPaused, banners, autoplayInterval]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const prev = () => {
    if (!banners.length) return;
    setIndex((i) => (i - 1 + banners.length) % banners.length);
    resetTimer();
  };

  const next = () => {
    if (!banners.length) return;
    setIndex((i) => (i + 1) % banners.length);
    resetTimer();
  };

  const goTo = (n) => {
    setIndex(n);
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    if (!isPaused && banners.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % banners.length);
      }, autoplayInterval);
    }
  };

  if (!banners || banners.length === 0) {
    return (
      <div style={bannerCarousel.placeholder}>
        <h3 style={bannerCarousel.placeholderTitle}>
          No hay promociones por el momento
        </h3>
      </div>
    );
  }

  return (
    <div
      className="masiber-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={bannerCarousel.container}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div style={bannerCarousel.slidesWrapper(banners.length, index)}>
        {banners.map((b) => (
          <div
            key={b.id}
            style={bannerCarousel.slideItem(banners.length)}
          >
            <BannerSlide banner={b} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Anterior"
        onClick={prev}
        style={bannerCarousel.controlButton("left")}
      >
        ‹
      </button>

      <button
        aria-label="Siguiente"
        onClick={next}
        style={bannerCarousel.controlButton("right")}
      >
        ›
      </button>

      {/* Dots */}
      <div style={bannerCarousel.dotsContainer}>
        {banners.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={bannerCarousel.dot(i === index)}
          />
        ))}
      </div>
    </div>
  );
}
