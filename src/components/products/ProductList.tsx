import { useLocation } from "@tanstack/react-router";
import { useProductList } from "@/hooks/useProductList";
import { useScrollToFirstResults } from "@/hooks/useScrollToFirstResults";
import { ProductCard, ProductPagination } from "@/components/products/index";
import { AlertBox } from "@/components/alert/AlertBox";

export const ProductList = () => {
  const { visibleProducts, totalPages, page, query } = useProductList();
  const location = useLocation();
  const scrollId = (location.state as { scrollToResultId?: number } | undefined)
    ?.scrollToResultId;

  useScrollToFirstResults(scrollId, visibleProducts);

  return (
    <>
      {query.trim() && visibleProducts.length === 0 && (
        <div className="mt-6">
          <AlertBox
            open={true}
            action={false}
            title="Ooops..."
            description="This search did not give any results."
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {visibleProducts.map((item) => {
          return <ProductCard item={item} key={item.id} />;
        })}
      </div>
      <ProductPagination page={page} totalPages={totalPages} />
    </>
  );
};
