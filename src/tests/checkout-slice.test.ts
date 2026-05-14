import checkoutReducer, {
  setSelectedDelivery,
  setSelectedPayment,
  resetCheckoutSelection,
  selectSelectedDeliveryFee,
} from "@/lib/redux/slices/checkoutSlice";

describe("checkoutSlice reducers and selectors", () => {
  test("setSelectedDelivery as home", () => {
    const result = checkoutReducer(undefined, setSelectedDelivery("home"));
    expect(result.selectedDelivery).toBe("home");
  });

  test("setSelectedDelivery as office", () => {
    const result = checkoutReducer(undefined, setSelectedDelivery("office"));
    expect(result.selectedDelivery).toBe("office");
  });

  test("setSelectedDelivery as box", () => {
    const result = checkoutReducer(undefined, setSelectedDelivery("box"));
    expect(result.selectedDelivery).toBe("box");
  });

  test("setSelectedPayment as klarna", () => {
    const result = checkoutReducer(undefined, setSelectedPayment("klarna"));
    expect(result.selectedPayment).toBe("klarna");
  });

  test("setSelectedPayment as card", () => {
    const result = checkoutReducer(undefined, setSelectedPayment("card"));
    expect(result.selectedPayment).toBe("card");
  });

  test("setSelectedPayment as vipps", () => {
    const result = checkoutReducer(undefined, setSelectedPayment("vipps"));
    expect(result.selectedPayment).toBe("vipps");
  });

  test("resetCheckoutSelection resets to default values", () => {
    const result = checkoutReducer(
      { selectedDelivery: "home", selectedPayment: "vipps" },
      resetCheckoutSelection(),
    );
    expect(result.selectedDelivery).toBe("box");
    expect(result.selectedPayment).toBe(null);
  });

  test("selectSelectedDeliveryFee is set to 149 for home delivery", () => {
    expect(selectSelectedDeliveryFee.resultFunc("home")).toBe(149);
  });

  test("selectSelectedDeliveryFee with invalid delivery", () => {
    expect(selectSelectedDeliveryFee.resultFunc(null)).toBe(0);
  });
});
