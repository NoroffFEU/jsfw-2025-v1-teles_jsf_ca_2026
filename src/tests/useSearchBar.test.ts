import { useSearchBar } from "../hooks/useSearchBar";
import { renderHook, act } from "@testing-library/react";

const mockedNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("useSearchBar", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  test("should submit trimmed query and navigates to search results", async () => {
    const { result } = renderHook(() => useSearchBar());

    act(() => {
      result.current.handleOnChange({
        target: { value: "toy" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.SubmitEvent<HTMLFormElement>);
    });

    expect(result.current.inputQuery).toBe("toy");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate.mock.calls[0][0]).toMatchObject({
      to: "/",
      resetScroll: false,
      state: { scrollToResultId: expect.any(Number) },
    });
  });

  test("should clear query and set default results", async () => {
    const { result } = renderHook(() => useSearchBar());

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.inputQuery).toBe("");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate.mock.calls[0][0]).toMatchObject({
      to: "/",
    });
  });
});
