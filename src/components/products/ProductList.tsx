import { useEffect } from "react";
import { useProductList } from "@/hooks/useProductList";
import { ProductCard, ProductPagination } from "@/components/products/index";

export const ProductList = () => {
  const { visibleProducts, totalPages, page, scrollToFirstElements } =
    useProductList();

  useEffect(() => {
    scrollToFirstElements();
  }, [scrollToFirstElements]);

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
