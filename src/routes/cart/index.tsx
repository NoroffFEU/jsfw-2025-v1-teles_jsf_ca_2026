import CartDisplay from "@/components/cart/CartDisplay";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/cart/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Cart at ShopNet online shop",
      },
      {
        title: "Cart - ShopNet",
      },
    ],
  }),
  component: ShoppingCart,
});

function ShoppingCart() {
  return (
    <div className="w-full pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <div>
        <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
          Your Cart
        </h1>
        <CartDisplay />

        <Link
          to="/"
          className="w-fit flex gap-2 justify-self-end items-center hover:underline"
        >
          <Plus /> Continue shopping
        </Link>
      </div>
    </div>
  );
}
