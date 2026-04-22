import CartDisplay from "@/components/cart/CartDisplay";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: ShoppingCart,
});

function ShoppingCart() {
  return (
    <div className="w-full pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <h1 className="text-3xl mb-2 font-mono">Your Cart</h1>

      <CartDisplay />
    </div>
  );
}
