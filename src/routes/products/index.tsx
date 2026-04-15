import { createFileRoute } from "@tanstack/react-router";
// import { useSelector } from 'react-redux';

export const Route = createFileRoute("/products/")({
  component: Products,
});

function Products() {
  // const selectProductName = (state) => state.product.productName;
  // const productName = useSelector(selectProductName);
  console.log("Products rendering...");
  return (
    <div className="p-2 justify-self-center">
      <h1 className="text-4xl">Online Shop - Products</h1>
    </div>
  );
}
