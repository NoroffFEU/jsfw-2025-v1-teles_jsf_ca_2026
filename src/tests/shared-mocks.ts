const sharedMocks = vi.hoisted(() => ({
  mockedNavigate: vi.fn(),
  mockedDispatch: vi.fn(),
  mockedToastSuccess: vi.fn(),
  mockedToastError: vi.fn(),
}));

export const getSharedMocks = () => sharedMocks;

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => sharedMocks.mockedNavigate,
  };
});

vi.mock("@/lib/redux/hooks/useAppDispatch", () => ({
  useAppDispatch: () => sharedMocks.mockedDispatch,
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: sharedMocks.mockedToastSuccess,
    error: sharedMocks.mockedToastError,
  },
}));

vi.mock("@/lib/redux/slices/checkoutSlice", () => ({
  resetCheckoutSelection: vi.fn(() => ({ type: "resetCheckoutSelection" })),
}));

vi.mock("@/lib/redux/slices/cartSlice", () => ({
  clearCart: vi.fn(() => ({ type: "clearCart" })),
}));
