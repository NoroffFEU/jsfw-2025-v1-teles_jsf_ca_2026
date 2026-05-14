import cartReducer, {
  clearCart,
  removeItem,
  updateQuantity,
  addItem,
} from "@/lib/redux/slices/cartSlice";

describe("cartSlice update cart reducers", () => {
  const itemInput = {
    productId: "1",
    title: "Test Item",
    image: { url: "", alt: "" },
    price: 10,
    discountedPrice: 1,
  };

  test("addItem", () => {
    const result = cartReducer(undefined, addItem(itemInput));

    expect(result).toEqual({
      items: {
        "1": {
          ...itemInput,
          quantity: 1,
        },
      },
    });
  });

  test("removeItem", () => {
    const result = cartReducer(undefined, removeItem("1"));
    expect(result).toEqual({ items: {} });
  });

  test("updateQuantity", () => {
    const state = cartReducer(undefined, addItem(itemInput));
    const result = cartReducer(
      state,
      updateQuantity({ productId: "1", quantity: 2 }),
    );
    expect(result.items["1"].quantity).toBe(2);
  });

  test("clearCart", () => {
    const result = cartReducer(undefined, clearCart());
    expect(result).toEqual({ items: {} });
  });
});
