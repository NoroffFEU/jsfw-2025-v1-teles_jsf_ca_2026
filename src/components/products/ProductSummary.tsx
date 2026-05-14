import { getProductCardMeta } from "@/lib/helpers/getProductCardMeta";
import { Badge } from "@/components/ui/badge/Badge";
import { AddToCartButton } from "./index";
import type { Product } from "@/services/models/product";
import { formatCurrency } from "@/lib/helpers/formatCurrency";

export const ProductSummary = ({ product }: { product: Product }) => {
  const { hasDiscount, hasTags, discount } = getProductCardMeta({
    discountedPrice: product.discountedPrice,
    price: product.price,
    tags: product.tags,
    reviews: product.reviews,
  });

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 pt-10 pl-2 pr-2 md:pl-20 md:pr-20 justify-self-center justify-center">
      <img
        src={product.image.url}
        alt={product.title}
        fetchPriority="high"
        className="w-80 h-auto m-4 justify-self-center rounded-sm hover:scale-102 shadow-xl transition duration-200"
      />
      <div className="grid gap-4 w-80 justify-self-center">
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <div className="flex justify-between items-center">
          {hasTags && <Badge>{product.tags}</Badge>}

          {hasDiscount && (
            <Badge
              className="bg-selection text-black rounded-full"
              children={`-${discount}%`}
            />
          )}
        </div>
        <p>{product.description}</p>

        {!hasDiscount && (
          <p>
            <span className="font-bold">Price:</span>{" "}
            {formatCurrency(product.price)}
          </p>
        )}

        {hasDiscount && (
          <div className="text-sm">
            <p className="font-bold">
              Discount price:{" "}
              <span className="text-green-700 font-bold">
                {formatCurrency(product.discountedPrice)}
              </span>
            </p>
            <s className="text-xs text-gray-800">
              Original price: {formatCurrency(product.price)}
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
  );
};
