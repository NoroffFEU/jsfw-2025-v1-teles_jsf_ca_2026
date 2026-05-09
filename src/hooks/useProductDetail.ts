import { productByIdQuery } from "@/lib/helpers/productsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Product } from "@/services/models/product";

/**
 * Custom hook for fetching and deriving product detail data.
 *
 * Fetches product data by ID using suspense query and computes
 * useful derived values for product detail UI display.
 *
 * @param {Product["id"]} productId - ID of the product to fetch
 * @returns {Object} Product data and derived values
 * @returns {Product} returns.product - Full product data from API
 * @returns {boolean} returns.hasDiscount - True if product has discounted price
 * @returns {boolean} returns.hasReviews - True if product has reviews
 * @returns {boolean} returns.hasTags - True if product has tags
 * @returns {number | string} returns.highestRating - Highest review rating or "Not rated"
 * @returns {string} returns.discount - Discount percentage as formatted string (e.g. "15")
 *
 * @example
 * const { product, hasDiscount, discount } = useProductDetail(productId);
 *
 * return (
 *   <div>
 *     <h1>{product.name}</h1>
 *     {hasDiscount && (
 *       <span>{discount}% OFF</span>
 *     )}
 *   </div>
 * );
 */
export const useProductDetail = (productId: Product["id"]) => {
  const { data } = useSuspenseQuery(productByIdQuery(productId));

  const product = data.data;
  const hasDiscount = product.discountedPrice < product.price;
  const hasReviews = product.reviews.length !== 0;
  const hasTags = product.tags.length !== 0;
  const highestRating =
    product.reviews?.length > 0
      ? Math.max(...product.reviews.map((rev) => rev.rating))
      : "Not rated";
  const discountPercentage =
    ((product.price - product.discountedPrice) / product.price) * 100;
  const discount = discountPercentage.toFixed(0);

  return {
    product,
    hasDiscount,
    hasReviews,
    hasTags,
    highestRating,
    discount,
  };
};
