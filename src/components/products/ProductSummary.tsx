import { useProductDetail } from "@/hooks/useProductDetail";
import { Badge } from "@/components/ui/badge/Badge";
import { AddToCartButton, ProductReviews } from "./index";
import type { Product } from "@/services/models/product";

type ProductSummaryProps = {
  id: Product["id"];
};

export const ProductSummary = ({ id }: ProductSummaryProps) => {
  const { product, hasDiscount, hasReviews, hasTags } = useProductDetail(id);

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
                <span className="text-green-700 font-bold">
                  {product.discountedPrice} NOK
                </span>
              </p>
              <s className="text-xs text-gray-800">
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
      <ProductReviews product={product} hasReviews={hasReviews} />
    </div>
  );
};
