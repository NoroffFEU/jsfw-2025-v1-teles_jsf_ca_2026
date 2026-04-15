import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/cart")({
  component: ShoppingCart,
});

function ShoppingCart() {
  return (
    <div className="p-2 justify-self-center">
      <h1 className="text-4xl">Online Shop - Cart</h1>
    </div>
  );
}
