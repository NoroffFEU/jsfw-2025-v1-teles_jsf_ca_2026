import CheckoutDisplay from "@/components/checkout/CheckoutDisplay";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cart/checkout")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Checkout at ShopNet online shop",
      },
      {
        title: "Checkout - ShopNet",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  return (
    <div className="w-full pt-10 pl-10 pr-10 lg:pl-20 lg:pr-20 justify-self-center">
      <Link
        to="/cart"
        className="w-fit flex gap-2 items-center hover:underline"
      >
        <ArrowLeft /> Back to shoppingbag
      </Link>

      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
        Checkout
      </h1>
      <CheckoutDisplay />
    </div>
  );
}
