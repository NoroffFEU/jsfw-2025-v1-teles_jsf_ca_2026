import { renderHook } from "@testing-library/react";
import { useProductList } from "@/hooks/useProductList";
import { PAGE_SIZE } from "@/lib/utils";
import type { Product } from "@/services/models/product";

const mockedUseSearch = vi.fn();
const mockedUseSuspenseQuery = vi.fn();
const mockedProductsQuery = vi.fn(() => ({ queryKey: ["products"] }));

vi.mock("@/routes/index", () => ({
  Route: {
    useSearch: () => mockedUseSearch(),
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: () => mockedUseSuspenseQuery(),
}));

vi.mock("@/lib/helpers/productsQuery", () => ({
  productsQuery: () => mockedProductsQuery(),
}));

const mockProduct = (
  id: string,
  overrides: Partial<Product> = {},
): Product => ({
  id,
  title: `Product ${id}`,
  description: `Description ${id}`,
  price: 100,
  discountedPrice: 90,
  image: { url: "", alt: `Product ${id}` },
  rating: 5,
  tags: [],
  reviews: [],
  ...overrides,
});

const setSearch = (
  overrides?: Partial<{ page: number; query: string; sort: string }>,
) => {
  mockedUseSearch.mockReturnValue({
    page: 1,
    query: "",
    sort: "newest",
    ...overrides,
  });
};

const setProducts = (products: Product[]) => {
  mockedUseSuspenseQuery.mockReturnValue({
    data: { data: products },
  });
};

describe("useProductList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setSearch();
  });

  test("should filter by normalized query on title, tags and description", () => {
    const products = [
      mockProduct("1", {
        title: "Gaming PC",
      }),
      mockProduct("2", {
        tags: ["gaming", "computer"],
      }),
      mockProduct("3", {
        description: "Perfect for gaming.",
      }),
      mockProduct("4", {
        title: "Tool Case",
        description: "With room for a lot of tools.",
      }),
    ];
    setProducts(products);
    setSearch({ query: "gaming" });

    const { result } = renderHook(() => useProductList());
    expect(result.current.products).toHaveLength(4);
    expect(result.current.page).toBe(1);
    expect(result.current.visibleProducts.map((p) => p.id)).toEqual([
      "1",
      "2",
      "3",
    ]);
  });

  test("pagination with multiple pages", () => {
    const products = Array.from({ length: PAGE_SIZE + 2 }, (_, i) =>
      mockProduct(String(i + 1)),
    );
    setProducts(products);
    setSearch({ page: 2 });

    const { result } = renderHook(() => useProductList());
    expect(result.current.visibleProducts).toHaveLength(2);
    expect(result.current.visibleProducts.map((p) => p.id)).toEqual([
      String(PAGE_SIZE + 1),
      String(PAGE_SIZE + 2),
    ]);
  });
});
