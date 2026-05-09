import { useCallback, useEffect, useState } from "react";
import { normalizeIndex, clampIndex } from "@/lib/utils";

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
