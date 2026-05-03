import { productsQuery } from "@/lib/helpers/productsQuery";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { setProducts } from "@/lib/redux/slices/productSlice";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { PAGE_SIZE, normalize } from "@/lib/utils";
import { Route } from "@/routes/index";
import type { Product } from "@/services/models/product";

export const useProductList = () => {
  const { page, query, sort } = Route.useSearch();
  const location = useLocation();
  const lastHandledNonce = useRef<number | null>(null);
  const { data } = useSuspenseQuery(productsQuery());
  const products = data.data;
  const dispatch = useAppDispatch();

  const scrollId = (location.state as { scrollToResultId?: number } | undefined)
    ?.scrollToResultId;

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  const { visibleProducts, totalPages } = useMemo(() => {
    const normalizedQuery = normalize(query);

    const filtered = normalizedQuery
      ? products.filter((p) => {
          const byTitle = normalize(p.title).includes(normalizedQuery);
          const byTags = p.tags.some((tag) =>
            normalize(tag).includes(normalizedQuery),
          );
          const byDescription = normalize(p.description).includes(
            normalizedQuery,
          );
          return byTitle || byTags || byDescription;
        })
      : products;

    const sorted = [...filtered].sort((a: Product, b: Product) => {
      if (sort === "priceLow") return a.discountedPrice - b.discountedPrice;
      if (sort === "priceHigh") return b.discountedPrice - a.discountedPrice;
      if (sort === "ratingHigh") return b.rating - a.rating;
      if (sort === "onSale") {
        const aDiscount = a.price - a.discountedPrice;
        const bDiscount = b.price - b.discountedPrice;
        return bDiscount - aDiscount;
      }
      return 0;
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const firstPage = (page - 1) * PAGE_SIZE;
    const visibleProducts = sorted.slice(firstPage, firstPage + PAGE_SIZE);
    return { visibleProducts, totalPages, firstPage };
  }, [products, query, sort, page]);

  const scrollToFirstElements = () => {
    if (!scrollId) return;
    if (lastHandledNonce.current === scrollId) return;
    if (!visibleProducts.length) {
      lastHandledNonce.current = scrollId;
      return;
    }

    const firstProd = visibleProducts[0];
    requestAnimationFrame(() => {
      document
        .getElementById(`product-${firstProd.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      lastHandledNonce.current = scrollId;
    });
  };

  return { visibleProducts, totalPages, page, scrollToFirstElements };
};
