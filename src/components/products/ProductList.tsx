import { useEffect } from "react";
import { useProductList } from "@/hooks/useProductList";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { setProducts } from "@/lib/redux/slices/productSlice";
import { ProductCard, ProductPagination } from "@/components/products/index";
import { useLocation } from "@tanstack/react-router";
import { useScrollToFirstResults } from "@/hooks/useScrollToFirstResults";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, visibleProducts, totalPages, page } = useProductList();
  const location = useLocation();
  const scrollId = (location.state as { scrollToResultId?: number } | undefined)
    ?.scrollToResultId;

  useScrollToFirstResults(scrollId, visibleProducts);

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

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
