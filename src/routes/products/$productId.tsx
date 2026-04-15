import { createFileRoute } from "@tanstack/react-router";

const fetchProduct = [
  { productId: 2, name: "Product 1" },
  { productId: 7, name: "Product 2" },
];

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => fetchProduct(params.productId),
  component: ProductDetail,
});

function ProductDetail() {
  return (
    <div className="p-2 justify-self-center">
      <h1 className="text-4xl">Online Shop - Product Details</h1>
      <div>Product ID: {productId}</div>
    </div>
  );
}
