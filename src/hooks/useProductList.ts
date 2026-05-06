import { productsQuery } from "@/lib/helpers/productsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PAGE_SIZE, normalize } from "@/lib/utils";
import { Route } from "@/routes/index";
import type { Product } from "@/services/models/product";

export const useProductList = () => {
  const { page, query, sort } = Route.useSearch();
  const { data } = useSuspenseQuery(productsQuery());
  const products = data.data;

  return useMemo(() => {
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
    const visibleProducts = sorted.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE,
    );
    return { products, visibleProducts, totalPages, page };
  }, [products, query, sort, page]);
};
