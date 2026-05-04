import { createFileRoute } from "@tanstack/react-router";
import { productByIdQuery } from "@/lib/helpers/productsQuery";
import { ProductSummary } from "@/components/products/ProductSummary";
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
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();

  return <ProductSummary id={productId} />;
}
