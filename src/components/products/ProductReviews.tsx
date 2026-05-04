import type { Product } from "@/services/models/product";

type ProductReviewProps = {
  product: Product;
  hasReviews: boolean;
};

export const ProductReviews = ({ product, hasReviews }: ProductReviewProps) => {
  return (
    <div className="mt-12 pt-2 border-t-2">
      <h2 className="text-2xl mt-2">Reviews</h2>
      {!hasReviews && <p>No reviews of this product yet.</p>}

      {hasReviews &&
        product.reviews.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded-sm">
            <p>
              <b>Rating:</b> {item.rating}
            </p>
            <p>
              <b>Review:</b> {item.description}
            </p>
            <p>
              <b>Username:</b> {item.username}
            </p>
          </div>
        ))}
    </div>
  );
};
