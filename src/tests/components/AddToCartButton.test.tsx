import "@/tests/shared-mocks";
import { render } from "@testing-library/react";
import { AddToCartButton } from "@/components/products/AddToCartButton";

describe("AddToCartButton", () => {
  const product = {
    id: "id",
    title: "Product",
    image: { url: "", alt: "" },
    price: 100,
    discountedPrice: 90,
  };

  test("should render", () => {
    const { container } = render(
      <AddToCartButton
        productId={product.id}
        title={product.title}
        image={product.image}
        price={product.price}
        discountedPrice={product.discountedPrice || product.price}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
