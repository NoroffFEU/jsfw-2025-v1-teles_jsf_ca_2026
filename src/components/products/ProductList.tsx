import { useProductList } from "@/hooks/useProductList";
import { ProductCard, ProductPagination } from "@/components/products/index";
import { useLocation } from "@tanstack/react-router";
import { useScrollToFirstResults } from "@/hooks/useScrollToFirstResults";

export const ProductList = () => {
  const { visibleProducts, totalPages, page } = useProductList();
  const location = useLocation();
  const scrollId = (location.state as { scrollToResultId?: number } | undefined)
    ?.scrollToResultId;

  useScrollToFirstResults(scrollId, visibleProducts);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {visibleProducts.map((item) => {
          return <ProductCard item={item} key={item.id} />;
        })}
      </div>
      <ProductPagination page={page} totalPages={totalPages} />
    </>
  );
};
