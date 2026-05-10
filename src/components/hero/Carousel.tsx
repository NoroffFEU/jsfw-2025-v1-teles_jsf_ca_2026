import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCarousel } from "@/hooks/useCarousel";
import { productsQuery } from "@/lib/helpers/productsQuery";
import { Link } from "@tanstack/react-router";

/**
 * Auto-playing product image carousel.
 *
 * Fetches products, builds up to 5 image slides, and displays them in a looping carousel.
 * Supports autoplay, manual slide selection, and optional configuration for the root element.
 * Each slide links to its product detail page.
 *
 * @param {CarouselProps} props - Carousel configuration
 * @param {string} [props.id="default-carousel"] - Optional DOM id for the carousel container
 * @param {number} [props.startImageIndex=0] - Initial active slide index
 * @param {number} [props.autoplayDelayMs=4000] - Delay between automatic slide changes in milliseconds
 * @param {(productId: string, imageUrl: string) => void} [props.onImageClick] - Optional click handler for image interactions
 *
 * @returns {JSX.Element | null} Carousel UI, or null when no valid slides exist
 *
 * @example
 * <Carousel
 *   id="home-carousel"
 *   startImageIndex={0}
 *   autoplayDelayMs={5000}
 * />
 */
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

export const Carousel = ({
  id = "default-carousel",
  startImageIndex = 0,
  autoplayDelayMs = 4000,
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

  const { activeIndex, setActive } = useCarousel<Slide>({
    items: slides,
    startImageIndex,
    autoplayDelayMs,
  });

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
      className="relative w-[80%] md:w-[40%] justify-self-center"
      data-carousel="slide"
    >
      <div className="media-carousel">
        {slides.map((slide, i) => (
          <div
            key={`${slide.productId}-${i}`}
            data-carousel-item=""
            className={`absolute inset-0 transition-all duration-700 ease-in-out will-change-transform ${getSlideClass(i)}`}
          >
            <Link
              id={slide.productId}
              aria-label={`Image of ${slide.productId}`}
              to="/products/$productId"
              params={{ productId: slide.productId }}
            >
              <img
                id={`carousel-image-${i}`}
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                // fetchPriority="high"
                className="absolute inset-0 block w-full h-full object-cover rounded cursor-pointer"
              />
            </Link>
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
              aria-current={i === activeIndex ? "true" : "false"}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
