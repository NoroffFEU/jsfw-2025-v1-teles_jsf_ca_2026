import { productsQuery } from "@/lib/helpers/productsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PAGE_SIZE, normalize } from "@/lib/utils";
import { Route } from "@/routes/index";
import type { Product } from "@/services/models/product";

/**
 * Custom hook for product list with search, sorting, and pagination.
 *
 * Fetches all products and applies client-side filtering, sorting,
 * and pagination based on URL search params.
 *
 * @returns {Object} Product list data with pagination
 * @returns {Product[]} returns.products - All available products (unfiltered)
 * @returns {Product[]} returns.visibleProducts - Currently visible products (paginated)
 * @returns {number} returns.totalPages - Total number of pages
 * @returns {number} returns.page - Current page number
 *
 * **Search params:**
 * - `query`: Filters by title, tags, or description (case-insensitive)
 * - `sort`: "priceLow", "priceHigh", "ratingHigh", "onSale"
 * - `page`: Current page number
 *
 * @example
 * const { visibleProducts, totalPages, page } = useProductList();
 *
 * return (
 *   <div>
 *     {visibleProducts.map(product => (
 *       <ProductCard key={product.id} product={product} />
 *     ))}
 *     <Pagination current={page} total={totalPages} />
 *   </div>
 * );
 */
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
