import z from "zod";

const sortValues = [
  "newest",
  "onSale",
  "ratingHigh",
  "priceLow",
  "priceHigh",
] as const;

export type ProductSort = (typeof sortValues)[number];
export const isProductSort = (value: string): value is ProductSort =>
  (sortValues as readonly string[]).includes(value);

type DefaultSearchProps = {
  page: number;
  query: string;
  sort: ProductSort;
};

export const defaultSearch: DefaultSearchProps = {
  page: 1,
  query: "",
  sort: "newest",
};

export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  query: z.string().trim().default(""),
  sort: z.enum(sortValues).default(defaultSearch.sort),
});
