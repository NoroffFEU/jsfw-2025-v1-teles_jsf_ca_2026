import type { Product } from "@/services/models/product";
import { useRef, useEffect } from "react";

/**
 * Custom hook for smooth-scrolling to first search result.
 *
 * Automatically scrolls to the first visible product in the list when
 * search parameters change (identified by unique `scrollId`).
 *
 * Prevents duplicate scrolls using nonce tracking.
 *
 * @param {number | undefined} scrollId - Unique ID indicating search state change
 * @param {Product[]} visibleProducts - Currently visible products array
 *
 * @example
 * // In product list component
 * useScrollToFirstResults(scrollNonce, visibleProducts);
 *
 * // scrollId changes whenever search/sort/page updates
 * // First product gets `.id="product-${product.id}"` class
 */
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
