import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchProducts } from "@/services/api/products/fetch/fetch-products";
import { Card, CardContent, CardFooter } from "@/components/ui/card/Card";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export const Route = createFileRoute("/products/")({
  component: Products,
  loader: () => fetchProducts(),
});

const ProductList = () => {
  const products = Route.useLoaderData().data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {products.map((item) => {
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
                <h3 className="text-2xl font-bold hover:underline cursor-pointer">
                  {item.title}
                </h3>
              </Link>
              <p>{item.description}</p>

              <AddToCartButton productId={item.id} />
            </CardContent>

            <CardFooter className="flex justify-between items-center text-sm">
              <p>Rating: {item.rating}</p>
              {!item.discountedPrice && <p>Price: {item.price}</p>}
              {item.discountedPrice && (
                <p>Discount price: {item.discountedPrice}</p>
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
      <h1 className="text-4xl mb-2">All Products</h1>
      <p>Find your favourite thing.</p>
      <hr />
      <ProductList />
    </div>
  );
}
