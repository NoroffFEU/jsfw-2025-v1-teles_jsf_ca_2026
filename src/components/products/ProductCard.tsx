import { Link } from "@tanstack/react-router";
import { getProductCardMeta } from "@/lib/helpers/getProductCardMeta";
import { Card, CardContent, CardFooter } from "@/components/ui/card/Card";
import { AddToCartButton } from "@/components/products/index";
import { Badge } from "@/components/ui/badge/Badge";
import type { Product } from "@/services/models/product";
import { formatCurrency } from "@/lib/helpers/formatCurrency";

type ProductCardProps = {
  item: Product;
};

export const ProductCard = ({ item }: ProductCardProps) => {
  const { hasDiscount, highestRating, discount } = getProductCardMeta({
    discountedPrice: item.discountedPrice,
    price: item.price,
    tags: item.tags,
    reviews: item.reviews,
  });

  return (
    <Card
      id={`product-${item.id}`}
      className="grid gap-2 items-center mt-2 bg-gray-50 md:hover:scale-102 transition duration-200"
    >
      {hasDiscount && (
        <Badge
          className="bg-selection text-black rounded-full p-1 mr-4 justify-self-end"
          children={`-${discount}%`}
        />
      )}

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
              fetchPriority="high"
              className="w-full h-auto rounded-xs object-cover cursor-pointer"
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
            <span className="font-bold">Price:</span>{" "}
            {formatCurrency(item.price)}
          </p>
        )}
        {hasDiscount && (
          <div className="text-sm">
            <p className="font-bold">
              Discount price:{" "}
              <span className="text-green-700 font-bold">
                {formatCurrency(item.discountedPrice)}
              </span>
            </p>
            <s className="text-xs text-gray-800">
              Original price: {formatCurrency(item.price)}
            </s>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
