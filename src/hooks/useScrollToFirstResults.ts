import type { Product } from "@/services/models/product";
import { useRef, useEffect } from "react";

export const useScrollToFirstResults = (
  scrollId: number | undefined,
  visibleProducts: Product[],
) => {
  const lastHandledNonce = useRef<number | null>(null);

  useEffect(() => {
    if (!scrollId || !visibleProducts.length) return;
    if (lastHandledNonce.current === scrollId) return;

    requestAnimationFrame(() => {
      document
        .getElementById(`product-${visibleProducts[0].id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      lastHandledNonce.current = scrollId;
    });
  }, [scrollId, visibleProducts]);
};
