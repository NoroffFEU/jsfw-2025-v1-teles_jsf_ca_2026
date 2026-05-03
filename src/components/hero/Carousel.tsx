import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/helpers/productsQuery";

type CarouselProps = {
  id?: string;
  startImageIndex?: number;
  autoplayDelayMs?: number;
  onImageClick?: (productId: string, imageUrl: string) => void;
};

type Slide = {
  productId: string;
  src: string;
  alt: string;
};

const normalizeIndex = (next: number, length: number) => {
  if (length === 0) return 0;
  return (next + length) % length;
};

const clampIndex = (value: number, length: number) => {
  if (length === 0) return 0;
  return Math.min(Math.max(value, 0), length - 1);
};

export const Carousel = ({
  id = "default-carousel",
  startImageIndex = 0,
  autoplayDelayMs = 4000,
  onImageClick,
}: CarouselProps) => {
  const { data } = useSuspenseQuery(productsQuery());
  const products = data.data;

  const slides = useMemo<Slide[]>(
    () =>
      products
        .map((item) => ({
          productId: item.id,
          src: item.image?.url ?? "",
          alt: item.title || "Products image",
        }))
        .slice(0, 5)
        .filter((slide) => Boolean(slide.src)),
    [products],
  );

  const [index, setIndex] = useState(() =>
    clampIndex(startImageIndex, slides.length),
  );

  const activeIndex =
    slides.length === 0 ? 0 : normalizeIndex(index, slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;

    const autoplayId = window.setInterval(() => {
      setIndex((prev) => normalizeIndex(prev + 1, slides.length));
    }, autoplayDelayMs);

    return () => window.clearInterval(autoplayId);
  }, [slides.length, autoplayDelayMs]);

  const setActive = (next: number) => {
    setIndex(normalizeIndex(next, slides.length));
  };

  const getSlideClass = (i: number) => {
    const total = slides.length;
    if (total === 0) return "slide-default";

    const ahead = (i - activeIndex + total) % total;

    if (ahead === 0) return "slide-default slide-active";
    if (ahead === 1) return "slide-default slide-next";
    if (ahead === total - 1) return "slide-default slide-previous";
    if (ahead < total / 2) return "slide-default slide-off-right";
    return "slide-default slide-off-left";
  };

  if (slides.length === 0) return null;

  return (
    <div
      id={id}
      className="relative w-[40%] justify-self-center"
      data-carousel="slide"
    >
      <div className="media-carousel">
        {slides.map((slide, i) => (
          <div
            key={`${slide.productId}-${i}`}
            data-carousel-item=""
            className={`absolute inset-0 transition-all duration-700 ease-in-out will-change-transform ${getSlideClass(i)}`}
          >
            <img
              id={`carousel-image-${i}`}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 block w-full h-full object-cover rounded cursor-pointer"
              onClick={() => onImageClick?.(slide.productId, slide.src)}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className="w-3 h-3 rounded-full z-10 bg-black/40 dark:bg-gray-600/40 transition aria-current:bg-black dark:aria-current:bg-white aria-current:scale-110 cursor-pointer"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index ? "true" : "false"}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
