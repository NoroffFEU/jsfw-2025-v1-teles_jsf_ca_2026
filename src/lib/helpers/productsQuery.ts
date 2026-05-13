import { queryOptions } from "@tanstack/react-query";
import { getAllProducts, getProductById } from "@/services/api/products";

export const productsQuery = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 1000,
  });
};

export const productByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 5 * 1000,
  });
};
