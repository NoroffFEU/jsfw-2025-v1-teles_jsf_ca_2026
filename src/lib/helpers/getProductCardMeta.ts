import type { Review } from "@/services/models/review";

type GetProductCardMetaProps = {
  discountedPrice: number;
  price: number;
  tags: string[];
  reviews: Review[];
};

export const getProductCardMeta = ({
  discountedPrice,
  price,
  tags,
  reviews,
}: GetProductCardMetaProps) => {
  const hasDiscount = discountedPrice < price;
  const hasReviews = reviews.length !== 0;
  const hasTags = tags.length !== 0;
  const highestRating =
    reviews?.length > 0
      ? Math.max(...reviews.map((rev) => rev.rating))
      : "Not rated";
  const discountPercentage =
    price > 0 ? ((price - discountedPrice) / price) * 100 : 0;
  const discount = discountPercentage.toFixed(0);

  return {
    hasDiscount,
    hasReviews,
    hasTags,
    highestRating,
    discount,
  };
};
