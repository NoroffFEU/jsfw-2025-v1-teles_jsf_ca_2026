import { createFileRoute } from "@tanstack/react-router";
import { productByIdQuery } from "@/lib/helpers/productsQuery";
import { ProductSummary, ProductReviews } from "@/components/products/index";
import { RouteLoader } from "@/components/layout/RouteLoader";
import type { Product } from "@/services/models/product";

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ context, params }): Promise<Product> => {
    const data = await context.queryClient.ensureQueryData(
      productByIdQuery(params.productId),
    );
    return data.data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: "description",
        content: `Product details for ${loaderData?.title ?? "Product"} at ShopNet online shop`,
      },
      { title: loaderData?.title ?? "Product" },
    ],
  }),
  pendingComponent: RouteLoader,
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const hasReviews = product.reviews.length > 0;

  return (
    <>
      <ProductSummary product={product} />{" "}
      <ProductReviews product={product} hasReviews={hasReviews} />
    </>
  );
}
