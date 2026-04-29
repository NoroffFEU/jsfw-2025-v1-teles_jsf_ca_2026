import { createFileRoute } from "@tanstack/react-router";
// import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
// import { selectProductsById } from "@/lib/redux/slices/productSlice";
import { fetchProductById } from "@/services/api/products/fetch/fetch-product-by-id";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge/Badge";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => fetchProductById(params.productId),
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Product details at ShopNet online shop",
      },
      {
        title: "Product",
      },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData().data;
  // const productsById = useAppSelector(selectProductsById);

  const hasDiscount = product.discountedPrice !== product.price;
  const hasReviews = product.reviews.length !== 0;
  const hasTags = product.tags.length !== 0;

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 pt-10 pl-2 pr-2 md:pl-20 md:pr-20 justify-self-center justify-center">
      <div className="grid gap-2">
        <h1 className="text-4xl text-center font-bold">{product.title}</h1>
        <img
          src={product.image.url}
          alt={product.title}
          className="w-80 m-4 justify-self-center rounded-sm hover:scale-102 shadow-xl transition duration-200 cursor-pointer"
        />
        <div className="grid gap-4 w-80 justify-self-center">
          {hasTags && <Badge>{product.tags}</Badge>}
          <p>{product.description}</p>

          {!hasDiscount && (
            <p>
              <span className="font-bold">Price:</span> {product.price} NOK
            </p>
          )}
          {hasDiscount && (
            <div className="text-sm">
              <p className="font-bold">
                Discount price:{" "}
                <span className="text-green-600 font-bold">
                  {product.discountedPrice} NOK
                </span>
              </p>
              <s className="text-xs text-gray-500">
                Original price: {product.price} NOK
              </s>
            </div>
          )}
          <AddToCartButton
            productId={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            discountedPrice={product.discountedPrice || product.price}
          />
        </div>
      </div>

      <div className="mt-12 pt-2 border-t-2">
        <h2 className="text-2xl mt-2">Reviews</h2>
        {!hasReviews && <p>No reviews of this product yet.</p>}

        {hasReviews &&
          product.reviews.map((item) => (
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
