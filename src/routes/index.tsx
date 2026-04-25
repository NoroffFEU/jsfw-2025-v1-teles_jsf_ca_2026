import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchProducts } from "@/services/api/products/fetch/fetch-products";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { setProducts } from "@/lib/redux/slices/productSlice";
import { Card, CardContent, CardFooter } from "@/components/ui/card/Card";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { SortSelect } from "@/components/search/SortSelect";

export const Route = createFileRoute("/")({
  component: Products,
  loader: () => fetchProducts(),
});

const ProductList = () => {
  const products = Route.useLoaderData().data;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
      {products.map((item) => {
        const hasDiscount = item.discountedPrice !== item.price;

        return (
          <Card
            key={item.id}
            className="grid gap-2 items-center mt-2 md:hover:scale-102 transition duration-200"
          >
            <CardContent className="grid gap-2 justify-self-center transition duration-200">
              <Link to="/products/$productId" params={{ productId: item.id }}>
                <img
                  src={item.image.url}
                  className="w-52 mx-auto cursor-pointer"
                />
              </Link>
              <Link to="/products/$productId" params={{ productId: item.id }}>
                <h3 className="w-fit text-2xl font-bold hover:underline cursor-pointer">
                  {item.title}
                </h3>
              </Link>
              <p>{item.description}</p>

              <AddToCartButton productId={item.id} />
            </CardContent>

            <CardFooter className="flex w-full h-full justify-between items-center text-sm">
              <p>
                <span className="font-bold">Rating:</span> {item.rating}
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
                    <span className="text-green-600 font-bold">
                      {item.discountedPrice} NOK
                    </span>
                  </p>
                  <s>Original price: {item.price} NOK</s>
                </div>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

function Products() {
  return (
    <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-green-300">
        Products
      </h1>
      <p>Find your favourite gadget.</p>
      <hr />
      <SortSelect />

      <ProductList />
    </div>
  );
}
