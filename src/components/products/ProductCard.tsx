import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card/Card";
import { AddToCartButton } from "@/components/products/index";
import type { Product } from "@/services/models/product";

type ProductCardProps = {
  item: Product;
};

export const ProductCard = ({ item }: ProductCardProps) => {
  const hasDiscount = item.discountedPrice !== item.price;
  const highestRating =
    item.reviews?.length > 0
      ? Math.max(...item.reviews.map((rev) => Number(rev.rating)))
      : "Not rated";

  return (
    <Card
      id={`product-${item.id}`}
      className="grid gap-2 items-center mt-2 md:hover:scale-102 transition duration-200"
    >
      <CardContent className="grid gap-2 justify-self-center transition duration-200">
        <Link
          id={item.id}
          aria-label={`Image of ${item.title}`}
          to="/products/$productId"
          params={{ productId: item.id }}
        >
          <div className="flex w-60 h-60 justify-self-center overflow-hidden">
            <img
              src={item.image.url}
              alt={item.image.alt}
              className="w-full rounded-xs object-cover cursor-pointer"
            />
          </div>
        </Link>
        <Link to="/products/$productId" params={{ productId: item.id }}>
          <h2 className="w-fit text-2xl font-bold hover:underline cursor-pointer">
            {item.title}
          </h2>
        </Link>
        <p>{item.description}</p>

        <AddToCartButton
          productId={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          discountedPrice={item.discountedPrice || item.price}
        />
      </CardContent>

      <CardFooter className="flex w-full h-full justify-between items-center text-sm">
        <p>
          <span className="font-bold">Rating:</span> {highestRating}
        </p>
        {!hasDiscount && (
          <p>
            <span className="font-bold">Price:</span> {item.price} NOK
          </p>
        )}
        {hasDiscount && (
          <div className="text-sm">
            <p className="font-bold">
              Discount price:{" "}
              <span className="text-green-700 font-bold">
                {item.discountedPrice} NOK
              </span>
            </p>
            <s className="text-xs text-gray-800">
              Original price: {item.price} NOK
            </s>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
