import { queryOptions } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api/products/fetch/fetchProducts";
import { fetchProductById } from "@/services/api/products/fetch/fetchProductById";

export const productsQuery = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 1000,
  });
};

export const productByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 5 * 1000,
  });
};
