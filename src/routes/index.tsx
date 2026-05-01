import { useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/lib/productsQuery";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { setProducts } from "@/lib/redux/slices/productSlice";
import { Card, CardContent, CardFooter } from "@/components/ui/card/Card";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { SortSelect } from "@/components/search/index";
import { searchSchema } from "@/lib/zod/searchSchema";
import type { Product } from "@/services/models/product";
import { PAGE_SIZE, normalize } from "@/lib/utils";

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

const ProductList = () => {
  const { page, query, sort } = Route.useSearch();
  const { data } = useSuspenseQuery(productsQuery());
  const products = data.data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  const { visibleProducts, totalPages } = useMemo(() => {
    const normalizedQuery = normalize(query);

    const filtered = normalizedQuery
      ? products.filter((p) => {
          const byTitle = normalize(p.title).includes(normalizedQuery);
          const byTags = p.tags.some((tag) =>
            normalize(tag).includes(normalizedQuery),
          );
          const byDescription = normalize(p.description).includes(
            normalizedQuery,
          );
          return byTitle || byTags || byDescription;
        })
      : products;

    const sorted = [...filtered].sort((a: Product, b: Product) => {
      if (sort === "priceLow") return a.discountedPrice - b.discountedPrice;
      if (sort === "priceHigh") return b.discountedPrice - a.discountedPrice;
      if (sort === "ratingHigh") return b.rating - a.rating;
      if (sort === "onSale") {
        const aDiscount = a.price - a.discountedPrice;
        const bDiscount = b.price - b.discountedPrice;
        return bDiscount - aDiscount;
      }
      return 0;
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const firstPage = (page - 1) * PAGE_SIZE;
    const visibleProducts = sorted.slice(firstPage, firstPage + PAGE_SIZE);
    return { visibleProducts, totalPages, firstPage };
  }, [products, query, sort, page]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {visibleProducts.map((item) => {
          const hasDiscount = item.discountedPrice !== item.price;
          const highestRating =
            item.reviews?.length > 0
              ? Math.max(...item.reviews.map((rev) => Number(rev.rating)))
              : "Not rated";

          return (
            <Card
              key={item.id}
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
        })}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {page > 1 && (
          <Link
            from={Route.fullPath}
            search={(prev) => ({ ...prev, page: prev.page - 1 })}
            className="flex items-end justify-self-end w-fit h-fit p-2 rounded border bg-background hover:border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
          >
            Previous Page
          </Link>
        )}

        {page < totalPages && (
          <Link
            from={Route.fullPath}
            search={(prev) => ({ ...prev, page: prev.page + 1 })}
            className="flex items-end justify-self-end w-fit h-fit p-2 rounded border bg-background hover:border-transparent hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
          >
            Next Page
          </Link>
        )}
      </div>
    </>
  );
};

function Products() {
  return (
    <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
        Products
      </h1>
      <p>Find your favourite gadget.</p>
      <hr />
      <SortSelect id="sort-select" />

      <ProductList />
    </div>
  );
}
