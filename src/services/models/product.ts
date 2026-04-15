import type { Review } from "./review";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: object;
  rating: number;
  tags: Array<string>;
  reviews: Array<Review>;
};
