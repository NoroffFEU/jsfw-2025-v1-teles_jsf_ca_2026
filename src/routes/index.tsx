import { productsQuery } from "@/lib/helpers/productsQuery";
import { createFileRoute } from "@tanstack/react-router";
import { searchSchema } from "@/lib/zod/searchSchema";

import { ProductList } from "@/components/products/index";
import { SortSelect } from "@/components/search/index";
import { Hero } from "@/components/hero/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Products page for ShopNet online shop",
      },
      {
        title: "Products - ShopNet",
      },
    ],
  }),
  component: Products,
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery()),
  validateSearch: searchSchema,
});

function Products() {
  return (
    <>
      <Hero />
      <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
        <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
          Products
        </h1>
        <p>Find your favourite gadget.</p>
        <hr />
        <SortSelect id="sort-select" />
        <ProductList />
      </div>
    </>
  );
}
