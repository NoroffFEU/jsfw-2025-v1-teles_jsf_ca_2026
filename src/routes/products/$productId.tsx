import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productByIdQuery } from "@/lib/products-query";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge/Badge";
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
  const { data: product } = useSuspenseQuery(productByIdQuery(productId));
  const {
    id,
    title,
    image,
    tags,
    reviews,
    description,
    price,
    discountedPrice,
  } = product.data;
  const hasDiscount = discountedPrice !== price;
  const hasReviews = reviews.length !== 0;
  const hasTags = tags.length !== 0;

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 pt-10 pl-2 pr-2 md:pl-20 md:pr-20 justify-self-center justify-center">
      <div className="grid gap-2">
        <h1 className="text-4xl text-center font-bold">{title}</h1>
        <img
          src={image.url}
          alt={title}
          className="w-80 m-4 justify-self-center rounded-sm hover:scale-102 shadow-xl transition duration-200 cursor-pointer"
        />
        <div className="grid gap-4 w-80 justify-self-center">
          {hasTags && <Badge>{tags}</Badge>}
          <p>{description}</p>

          {!hasDiscount && (
            <p>
              <span className="font-bold">Price:</span> {price} NOK
            </p>
          )}
          {hasDiscount && (
            <div className="text-sm">
              <p className="font-bold">
                Discount price:{" "}
                <span className="text-green-600 font-bold">
                  {discountedPrice} NOK
                </span>
              </p>
              <s className="text-xs text-gray-500">
                Original price: {price} NOK
              </s>
            </div>
          )}
          <AddToCartButton
            productId={id}
            title={title}
            image={image}
            price={price}
            discountedPrice={discountedPrice || price}
          />
        </div>
      </div>

      <div className="mt-12 pt-2 border-t-2">
        <h2 className="text-2xl mt-2">Reviews</h2>
        {!hasReviews && <p>No reviews of this product yet.</p>}

        {hasReviews &&
          reviews.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-sm">
              <p>
                <b>Rating:</b> {item.rating}
              </p>
              <p>
                <b>Review:</b> {item.description}
              </p>
              <p>
                <b>Username:</b> {item.username}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
