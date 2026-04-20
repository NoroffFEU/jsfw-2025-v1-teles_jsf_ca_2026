import type { Review } from "./review";

export type ApiProduct = {
  data: Product[];
  meta: ProductMeta;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
  rating: number;
  tags: Array<string>;
  reviews: Array<Review>;
};

export type ProductMeta = {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number | null;
  pageCount: number;
  previousPage: number | null;
  totalCount: number;
};
