import { useCallback, useEffect, useState } from "react";
import { normalizeIndex, clampIndex } from "@/lib/utils";

/**
 * Carousel state hook with autoplay support.
 *
 * Manages active slide index with wrapping behavior (loops back to start).
 * Supports manual index setting and configurable autoplay.
 * Uses `clampIndex()` and `normalizeIndex()` utilities for bounds checking.
 *
 * @template T - Slide data type (e.g., `{productId: string, src: string}`)
 * @param {UseCarouselOptions<T>} options - Carousel configuration
 * @param {T[]} options.items - Array of slide data
 * @param {number} [options.startImageIndex=0] - Initial active slide (0-based)
 * @param {number | null} [options.autoplayDelayMs=4000] - Auto-advance interval, or null to disable
 *
 * @returns {UseCarouselResult} Carousel state and controls
 * @returns {number} returns.activeIndex - Current active slide index (0 to items.length-1)
 * @returns {(next: number) => void} returns.setActive - Set active slide by index
 *
 * @example
 * const { activeIndex, setActive } = useCarousel({
 *   items: slides,
 *   autoplayDelayMs: 5000,
 * });
 */
type UseCarouselOptions<T> = {
  items: T[];
  startImageIndex?: number;
  autoplayDelayMs?: number | null;
};

type UseCarouselResult = {
  activeIndex: number;
  setActive: (next: number) => void;
};

export const useCarousel = <T>({
  items,
  startImageIndex = 0,
  autoplayDelayMs = 4000,
}: UseCarouselOptions<T>): UseCarouselResult => {
  const itemsLength = items.length;

  const [index, setIndex] = useState(() =>
    clampIndex(startImageIndex, itemsLength),
  );
  const activeIndex =
    itemsLength === 0 ? 0 : normalizeIndex(index, itemsLength);

  useEffect(() => {
    if (itemsLength <= 1 || autoplayDelayMs == null) return;

    const autoplayId = window.setInterval(() => {
      setIndex((prev) => normalizeIndex(prev + 1, itemsLength));
    }, autoplayDelayMs);

    return () => clearInterval(autoplayId);
  }, [itemsLength, autoplayDelayMs]);

  const setActive = useCallback(
    (next: number) => {
      setIndex(normalizeIndex(next, itemsLength));
    },
    [itemsLength],
  );

  return { activeIndex, setActive };
};
