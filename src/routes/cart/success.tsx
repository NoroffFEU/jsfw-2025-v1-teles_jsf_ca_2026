import { defaultSearch } from "@/lib/zod/searchSchema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cart/success")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Thank you for shopping at ShopNet",
      },
      {
        title: "Order confirmed - ShopNet",
      },
    ],
  }),
  component: Success,
});

function Success() {
  return (
    <div className="w-full h-screen pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <div className="grid grid-template-rows gap-4 justify-items-center">
        <h1 className="text-4xl mt-4 mb-4 p-1 rounded-sm font-mono bg-selection">
          Order confirmed
        </h1>
        <p className="text-xl mt-8">Thank you for your purchase!</p>

        <Link
          to="/"
          search={defaultSearch}
          className="w-fit flex gap-2 items-center hover:underline"
        >
          <ArrowLeft /> View more products
        </Link>
      </div>
    </div>
  );
}
