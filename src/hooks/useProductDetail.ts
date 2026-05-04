import { productByIdQuery } from "@/lib/helpers/productsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Product } from "@/services/models/product";

export const useProductDetail = (productId: Product["id"]) => {
  const { data } = useSuspenseQuery(productByIdQuery(productId));

  const product = data.data;
  const hasDiscount = product.discountedPrice !== product.price;
  const hasReviews = product.reviews.length !== 0;
  const hasTags = product.tags.length !== 0;

  return {
    product,
    hasDiscount,
    hasReviews,
    hasTags,
  };
};
