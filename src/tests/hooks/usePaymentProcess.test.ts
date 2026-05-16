import { getSharedMocks } from "@/tests/shared-mocks";
import { act, renderHook } from "@testing-library/react";
import { usePaymentProcess } from "@/hooks/usePaymentProcess";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import { resetCheckoutSelection } from "@/lib/redux/slices/checkoutSlice";
import { paymentSuccessLinkOptions } from "@/lib/helpers/linkOptions";

const { mockedNavigate, mockedDispatch, mockedToastSuccess } = getSharedMocks();

describe("usePaymentProcess", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should set dialog open and disable immediatly", () => {
    const { result } = renderHook(() => usePaymentProcess());

    act(() => {
      result.current.handlePaymentProcess();
    });

    expect(result.current.openDialog).toBe(true);
    expect(result.current.isDisabled).toBe(true);
  });

  it("should run success fllow after timeout", () => {
    const { result } = renderHook(() => usePaymentProcess());

    act(() => {
      result.current.handlePaymentProcess();
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(mockedToastSuccess).toHaveBeenCalledWith("Payment success", {
      duration: 1000,
    });

    expect(mockedDispatch).toHaveBeenCalledWith(clearCart());
    expect(mockedDispatch).toHaveBeenCalledWith(resetCheckoutSelection());
    expect(mockedNavigate).toHaveBeenCalledWith(paymentSuccessLinkOptions);
    expect(result.current.isDisabled).toBe(false);
  });
});
