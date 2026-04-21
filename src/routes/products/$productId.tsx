import { createFileRoute } from "@tanstack/react-router";
// import { useSelector } from 'react-redux';
import { fetchProductById } from "@/services/api/products/fetch/fetch-product-by-id";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => fetchProductById(params.productId),
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData().data;
  // const selectProductName = (state) => state.product.productName;
  // const productName = useSelector(selectProductName);
  const hasDiscount = product.discountedPrice !== product.price;
  const hasReviews = product.reviews.length !== 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-10 pl-2 pr-2 md:pl-20 md:pr-20 justify-self-center justify-center">
      <div className="grid gap-2">
        <h1 className="text-4xl text-center">{product.title}</h1>
        <img
          src={product.image.url}
          alt={product.title}
          className="w-80 justify-self-center rounded-sm hover:scale-102 hover:shadow-xl transition duration-200 cursor-pointer"
        />
        <div className="grid gap-4 w-80 justify-self-center">
          <p>{product.description}</p>
          {!hasDiscount && <p>Price: {product.price}</p>}
          {hasDiscount && (
            <div>
              <p>Discount price: {product.discountedPrice}</p>
              <s>Original price: {product.price}</s>
            </div>
          )}
          <AddToCartButton productId={product.id} />
        </div>
      </div>

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
    </div>
  );
}
