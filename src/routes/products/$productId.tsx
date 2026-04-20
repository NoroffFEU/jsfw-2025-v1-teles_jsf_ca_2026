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
  return (
    <div className="grid gap-2 pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="text-4xl">{product.title}</h1>
      <img
        src={product.image.url}
        alt={product.title}
        className="w-100 justify-self-center"
      />
      <p>{product.description}</p>
      <p>Rating: {product.rating}</p>
      {!product.discountedPrice && <p>Price: {product.price}</p>}
      {product.discountedPrice && (
        <p>Discount price: {product.discountedPrice}</p>
      )}
      <AddToCartButton productId={product.id} />
    </div>
  );
}
